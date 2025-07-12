# clothe-again : give your clothe second chance 

A sustainable fashion platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Built with React (frontend) and Node.js (backend).

## 🌟 Features

### User Authentication
- Email/password signup and login
- OTP verification for enhanced security
- User profile management

### Landing Page
- Platform introduction and value proposition
- Call-to-action buttons: "Start Swapping", "Browse Items", "List an Item"
- Featured items carousel
- Statistics and impact metrics

### User Dashboard
- Profile details and points balance
- Uploaded items overview with status tracking
- Ongoing and completed swaps list
- Quick statistics and progress indicators

### Item Management
- **Browse Items**: Search, filter, and discover clothing
- **Item Detail Page**: Full image gallery, description, uploader info
- **Add New Item**: Upload images, enter details, set points value
- Swap requests and point-based redemption options

### Admin Panel
- Moderate and approve/reject item listings
- Remove inappropriate or spam items
- User management and platform oversight
- Analytics and reporting

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material UI** - Beautiful, responsive UI components
- **React Router** - Client-side routing
- **React Dropzone** - File upload functionality
- **React Image Gallery** - Image carousel and gallery
- **Axios** - HTTP client for API calls

### Backend (Coming Soon)
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File upload handling

## 📁 Project Structure

```
rewear-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── BrowseItems.js
│   │   ├── ItemDetail.js
│   │   ├── AddItem.js
│   │   └── AdminPanel.js
│   ├── App.js
│   ├── index.js
│   └── styles/
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rewear-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Backend Setup (Coming Soon)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### Material Design
- Consistent with Google's Material Design
- Beautiful animations and transitions
- Accessible color scheme and typography

### User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Loading states and feedback
- Error handling and validation

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌱 Sustainability Impact

ReWear promotes sustainable fashion by:
- **Reducing Textile Waste** - Encouraging reuse instead of disposal
- **Community Building** - Connecting like-minded individuals
- **Circular Economy** - Creating a closed-loop clothing system
- **Environmental Awareness** - Educating users about fashion's impact

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material UI for the beautiful component library
- Unsplash for placeholder images
- The sustainable fashion community for inspiration

## 📞 Support

For support, email support@rewear.com or create an issue in the repository.

---

**Made with ❤️ for a sustainable future** 