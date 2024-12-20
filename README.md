# Note App

A web application for managing and organizing personal notes securely. This project integrates Google OAuth for authentication, allowing users to log in with their Google accounts.

---

## Features

- **Secure Authentication:** Users can log in using Google OAuth.
- **Create Notes:** Add new notes with ease.
- **Edit Notes:** Update existing notes.
- **Delete Notes:** Remove unwanted notes.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js and npm installed
- MongoDB set up and running
- Google OAuth credentials (Client ID and Client Secret)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mhmd-Essam/note-website
   cd note-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URL=your_mongo_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   ```
   in this section i'am not describe the Environment Variables
   
5. **Run the Application**
   ```bash
   npm start
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:5000`.

---

## Usage

1. Visit the application URL.
2. Log in with your Google account.
3. Start creating, editing, and managing your notes.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (React or any other framework/library if applicable)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Google OAuth 2.0

---


## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or support, contact (Mhmd-Essam) in GitHub.

---

### Acknowledgments

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

