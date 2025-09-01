const express = require('express');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Prometheus URL
const PROMETHEUS_URL = process.env.PROMETHEUS_URL || 'http://prometheus:9090';

// Service configurations
const SERVICES = [
  { name: 'API Gateway', url: 'http://api-gateway:8080', port: 8080 },
  { name: 'Product Service', url: 'http://product-service:8082', port: 8082 },
  { name: 'User Service', url: 'http://user-service:8081', port: 8081 },
  { name: 'Cart Service', url: 'http://cart-service:8085', port: 8085 },
  { name: 'Membership Service', url: 'http://membership-service:8084', port: 8084 },
  { name: 'Redis', url: 'http://redis:6379', port: 6379 },
  { name: 'MongoDB', url: 'http://mongodb:27017', port: 27017 },
  { name: 'PostgreSQL', url: 'http://postgres:5432', port: 5432 }
];

// Function to query Prometheus
async function queryPrometheus(query) {
  try {
    const response = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
      params: { query }
    });
    return response.data.data.result;
  } catch (error) {
    console.error('Error querying Prometheus:', error.message);
    return [];
  }
}

// Function to get service health
async function getServiceHealth() {
  const healthData = {};
  
  for (const service of SERVICES) {
    try {
      // Check if it's a web service with /actuator/health endpoint
      if (service.port === 6379 || service.port === 27017 || service.port === 5432) {
        // For databases, we'll check if we can query them
        healthData[service.name] = {
          status: 'unknown',
          latency: 0,
          errorCount: 0
        };
      } else {
        // For Spring Boot services, check actuator health
        const healthResponse = await axios.get(`${service.url}/actuator/health`, {
          timeout: 5000
        });
        
        healthData[service.name] = {
          status: healthResponse.data.status || 'unknown',
          latency: healthResponse.headers['request-duration'] || 0,
          errorCount: 0
        };
      }
    } catch (error) {
      healthData[service.name] = {
        status: 'DOWN',
        latency: error.response?.status === 503 ? 0 : 9999,
        errorCount: 1
      };
    }
  }
  
  return healthData;
}

// Function to get metrics from Prometheus
async function getMetrics() {
  const metrics = {};
  
  // Get HTTP request rates
  for (const service of SERVICES) {
    if (service.port !== 6379 && service.port !== 27017 && service.port !== 5432) {
      try {
        // HTTP request rate (requests per second)
        const rateQuery = `rate(http_server_requests_seconds_count{job="${service.name.toLowerCase().replace(' ', '-')}", status!="500"}[5m])`;
        const rateResult = await queryPrometheus(rateQuery);
        const requestRate = rateResult.length > 0 ? parseFloat(rateResult[0].value[1]) : 0;
        
        // HTTP error rate
        const errorQuery = `rate(http_server_requests_seconds_count{job="${service.name.toLowerCase().replace(' ', '-')}", status="500"}[5m])`;
        const errorResult = await queryPrometheus(errorQuery);
        const errorRate = errorResult.length > 0 ? parseFloat(errorResult[0].value[1]) : 0;
        
        // 95th percentile latency
        const latencyQuery = `histogram_quantile(0.95, rate(http_server_requests_seconds_bucket{job="${service.name.toLowerCase().replace(' ', '-')}"}[5m]))`;
        const latencyResult = await queryPrometheus(latencyQuery);
        const latency95 = latencyResult.length > 0 ? parseFloat(latencyResult[0].value[1]) * 1000 : 0; // Convert to ms
        
        metrics[service.name] = {
          requestRate: requestRate.toFixed(2),
          errorRate: errorRate.toFixed(2),
          latency95: latency95.toFixed(2)
        };
      } catch (error) {
        console.error(`Error getting metrics for ${service.name}:`, error.message);
        metrics[service.name] = {
          requestRate: '0.00',
          errorRate: '0.00',
          latency95: '0.00'
        };
      }
    }
  }
  
  return metrics;
}

// Route for the main dashboard
app.get('/', async (req, res) => {
  try {
    const healthData = await getServiceHealth();
    const metricsData = await getMetrics();
    
    // Combine health and metrics data
    const combinedData = {};
    for (const service of SERVICES) {
      combinedData[service.name] = {
        ...healthData[service.name],
        ...metricsData[service.name]
      };
    }
    
    res.render('dashboard', { 
      services: combinedData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    res.status(500).send('Error loading dashboard');
  }
});

// API endpoint for real-time data
app.get('/api/health', async (req, res) => {
  try {
    const healthData = await getServiceHealth();
    const metricsData = await getMetrics();
    
    // Combine health and metrics data
    const combinedData = {};
    for (const service of SERVICES) {
      combinedData[service.name] = {
        ...healthData[service.name],
        ...metricsData[service.name]
      };
    }
    
    res.json({
      services: combinedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send initial data
  updateAndSendData(socket);
  
  // Set up periodic updates
  const interval = setInterval(() => {
    updateAndSendData(socket);
  }, 5000); // Update every 5 seconds
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(interval);
  });
});

// Function to update and send data to connected clients
async function updateAndSendData(socket) {
  try {
    const healthData = await getServiceHealth();
    const metricsData = await getMetrics();
    
    // Combine health and metrics data
    const combinedData = {};
    for (const service of SERVICES) {
      combinedData[service.name] = {
        ...healthData[service.name],
        ...metricsData[service.name]
      };
    }
    
    socket.emit('healthUpdate', {
      services: combinedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

// Start server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Monitoring dashboard running on port ${PORT}`);
});
