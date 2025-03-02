# MemoryApp

MemoryApp is a full-stack web application for users to upload and showcase their favorite memories. The app features user authentication, image uploads, and a mosaic-style image display.

## Features
- User authentication (SignUp & Login)
- Upload and display images
- Profile management
- Public user page
- Cloud storage integration

## Tech Stack
- **Frontend:** React (Next.js), Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Authentication:** Firebase
- **Image Uploads:** Cloudinary & Multer

## Installation & Setup
### Prerequisites
- Node.js (v18+)
- MongoDB
- Cloudinary Account
- Firebase Account

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MemoryApp.git
   cd MemoryApp-main
   ```

2. Install dependencies:
   ```bash
   yarn install  # or npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongo_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   ```

4. Run the application:
   ```bash
   yarn dev  # or npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
MemoryApp-main/
├── app/
│   ├── api/                 # API routes
│   ├── user/                # User-related pages
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.jsx           # Main layout
│   ├── page.jsx             # Landing page
│   ├── globals.css          # Global styles
├── config/                  # Configurations (Cloudinary, Firebase, Multer)
├── lib/                     # Database connection (MongoDB)
├── model/                   # Mongoose models
├── utils/                   # Helper functions
├── package.json             # Project dependencies
├── next.config.mjs          # Next.js config
├── .gitignore               # Git ignore file
└── README.md                # Project documentation
```

## API Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate user
- `POST /api/upload` - Upload an image
- `GET /api/get-memory` - Fetch uploaded memories

## Deployment
You can deploy the application using Vercel, Netlify, or a cloud provider.

## License
This project is licensed under the MIT License.