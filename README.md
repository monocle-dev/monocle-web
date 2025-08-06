# Monocle Web Dashboard

A modern React-based monitoring dashboard for the Monocle monitoring platform.

## Features

- **Real-time Dashboard**: Monitor all your services with live status updates via WebSocket connections
- **Multiple Monitor Types**: Support for HTTP/HTTPS, SSL, DNS, and database monitoring
- **Incident Tracking**: View recent incidents and their resolution status
- **Performance Metrics**: Track uptime percentages and response times
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Live Updates**: Automatic dashboard refresh when monitors change (create, update, delete)
- **Connection Status**: Visual indicators for WebSocket connection status

## 🏗️ Architecture

### Frontend (This Repository)

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **date-fns** for date formatting
- **WebSocket Integration**: Real-time dashboard updates
- **Real-time Updates**: Live dashboard with status monitoring

### Backend

- **Repository**: [monocle-web](https://github.com/monocle-dev/monocle)
- **Language**: Go 1.23
- **Framework**: Gin (HTTP router)
- **Database**: PostgreSQL with GORM
- **Authentication**: JWT-based authentication
- **Scheduling**: Custom job scheduler for monitor checks
- **Monitoring Types**: HTTP, Database (PostgreSQL), DNS, SSL

## Dashboard Components

### Monitor Management

- Create, edit, and delete monitors
- Support for various monitor types (HTTP, HTTPS, SSL, DNS, Database)
- Configurable check intervals and timeouts
- Custom HTTP headers and expected status codes

### Real-time Monitoring

- Live status indicators for all monitors
- Automatic refresh every 30 seconds
- Color-coded status badges (Online, Down, Timeout)
- Response time tracking

### Incident Management

- Recent incidents overview
- Incident duration tracking
- Automatic resolution detection
- Historical incident data

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/monocle-dev/monocle-web.git
cd monocle-web
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create .env file
VITE_API_BASE_URL=http://localhost:3000
```

4. Start the development server

```bash
npm run dev
```

## Usage

### Accessing the Dashboard

1. Navigate to the projects page
2. Click "View Dashboard" for any project
3. The dashboard will display:
   - Project overview with monitor statistics
   - Grid of all monitors with their current status
   - Recent incidents (if any)

### Creating Monitors

1. Click the "Add Monitor" button on the dashboard
2. Fill out the monitor form:
   - **Name**: Descriptive name for the monitor
   - **Type**: Choose from HTTP, HTTPS, SSL, DNS, or Database
   - **Interval**: How often to check (in seconds)
   - **Configuration**: Type-specific settings (URL, method, timeouts, etc.)
3. Click "Create" to save the monitor

### Monitor Configuration Examples

#### HTTP/HTTPS Monitor

```json
{
  "name": "My Website",
  "type": "https",
  "interval": 300,
  "config": {
    "url": "https://example.com",
    "method": "GET",
    "expected_status": 200,
    "timeout": 30,
    "headers": {
      "User-Agent": "Monocle Monitor"
    }
  }
}
```

## API Integration

The dashboard integrates with the Monocle API through several adapters:

- `monitorsAdapter.getDashboard()` - Fetch complete dashboard data
- `monitorsAdapter.getMonitors()` - Get monitors list
- `monitorsAdapter.createMonitor()` - Create new monitor
- `monitorsAdapter.updateMonitor()` - Update existing monitor
- `monitorsAdapter.deleteMonitor()` - Remove monitor

See `DASHBOARD_GUIDE.md` for detailed API documentation.

## Project Structure

```
src/
├── adapters/           # API integration layers
├── components/         # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/            # Generic UI components
├── hooks/             # Custom React hooks
├── interfaces/        # TypeScript type definitions
├── pages/             # Application pages/routes
├── utils/             # Utility functions
└── assets/            # Static assets
```

## Development

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
