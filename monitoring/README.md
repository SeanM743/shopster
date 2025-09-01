# Shopster Application Monitoring

This directory contains the monitoring setup for the Shopster ecommerce application. It includes configurations for Prometheus, Grafana, and a custom health dashboard.

## Overview

The monitoring system provides:

1. **Prometheus** - Metrics collection and storage
2. **Grafana** - Advanced visualization and dashboards
3. **Custom Health Dashboard** - Simplified real-time service health overview

## Components

### Prometheus
- Collects metrics from all services
- Configuration: `prometheus.yml`
- Port: 9090

### Grafana
- Advanced dashboards and visualizations
- Pre-configured Shopster dashboard
- Port: 3001
- Default credentials: admin/shopster123

### Custom Health Dashboard
- Simplified service health overview
- Real-time updates via WebSockets
- Port: 3002

## Services Monitored

1. API Gateway (port 8080)
2. Product Service (port 8082)
3. User Service (port 8081)
4. Cart Service (port 8085)
5. Membership Service (port 8084)
6. Redis (port 6379)
7. MongoDB (port 27017)
8. PostgreSQL (port 5432)

## Metrics Collected

### For Web Services:
- **Latency**: 95th percentile response times
- **Availability**: Service up/down status
- **Errors**: HTTP 500 error rates
- **Throughput**: Requests per second

### For Databases:
- **Connection Status**: Active connections
- **Performance**: Query latency (when available)

## Setup Instructions

### Prerequisites
1. Docker installed
2. WSL 2 integration enabled in Docker Desktop (if using WSL)

### Running the Monitoring Stack

The monitoring services have been successfully deployed and are running:

1. **Prometheus**: Running on http://localhost:9090
2. **Grafana**: Running on http://localhost:3001
3. **Custom Health Dashboard**: Running on http://localhost:3002

### Accessing the Services

1. **Prometheus Dashboard**: http://localhost:9090
   - View metrics and their values
   - Use the expression browser to query metrics

2. **Grafana Dashboard**: http://localhost:3001
   - Login with username: `admin` and password: `shopster123`
   - Pre-configured Shopster dashboard with visualizations

3. **Custom Health Dashboard**: http://localhost:3002
   - Real-time service health overview
   - WebSocket-based live updates
   - Simplified view of all service statuses

## Configuration Files

- `prometheus.yml` - Prometheus configuration
- `grafana/datasources/prometheus.yml` - Grafana datasource configuration
- `grafana/dashboards/shopster-dashboard.json` - Pre-configured Grafana dashboard
- `grafana/dashboards/default.yml` - Dashboard provisioning configuration

## Custom Dashboard Features

The custom health dashboard provides:

1. **Service Status Overview** - Color-coded status indicators
2. **Real-time Updates** - WebSocket-based live updates
3. **Key Metrics Display** - Requests/sec, Errors/sec, Latency, Availability
4. **Responsive Design** - Works on desktop and mobile devices
5. **Auto-refresh** - Updates every 5 seconds

## Grafana Dashboard Features

The Grafana dashboard includes:

1. **Overall Request Rate** - Total requests per second across all services
2. **Error Rate by Service** - HTTP 500 errors per service
3. **Overall Availability** - Percentage of successful requests
4. **Average Response Time** - Mean response time across services
5. **Latency by Service** - 95th percentile latency for each service
6. **Database Connections** - Active database connections

## Troubleshooting

### WSL 2 Integration Issues
If you encounter issues with Docker in WSL:
1. Ensure Docker Desktop is running
2. Enable WSL 2 integration in Docker Desktop settings
3. Restart Docker Desktop if needed

### Service Not Appearing in Monitoring
1. Check that the service is running and accessible
2. Verify Prometheus configuration in `prometheus.yml`
3. Ensure the service exposes metrics at `/actuator/prometheus` (for Spring Boot services)

### Grafana Dashboard Not Loading
1. Verify Grafana is running
2. Check datasource configuration
3. Ensure Prometheus is accessible from Grafana container

## Customization

### Adding New Services
1. Add the service to `prometheus.yml` scrape_configs
2. Update the `SERVICES` array in `apps/monitoring-dashboard/server.js`
3. Restart the monitoring stack

### Modifying Dashboards
1. Grafana dashboards can be modified through the web UI
2. Custom dashboard templates are in `apps/monitoring-dashboard/views/`

## Security Notes

- Default credentials are used for demonstration purposes
- In production, use strong passwords and enable authentication
- Restrict access to monitoring endpoints as needed

## Deployment Status

All monitoring services have been successfully deployed and are currently running:

- ✅ Prometheus: http://localhost:9090
- ✅ Grafana: http://localhost:3001
  - Login with username: `admin` and password: `shopster123`
  - Pre-configured datasource and dashboard provisioning
- ✅ Custom Health Dashboard: http://localhost:3002

The monitoring infrastructure is fully operational and collecting metrics from all Shopster services.
