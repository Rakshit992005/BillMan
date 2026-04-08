# BillMan 🧾

BillMan is a full-stack, modern Invoice and Customer Management Web Application developed to help businesses and freelancers track their sales, manage customers, and generate professional invoices with ease.

## 🔗 Links

- **Live Demo:** [https://bill-man.vercel.app/](https://bill-man.vercel.app/)
- **GitHub Repository:** [https://github.com/Rakshit992005/BillMan](https://github.com/Rakshit992005/BillMan)

## 🌟 Key Features

- **User Authentication:** Secure signup and login using JWT and bcrypt.
- **Dashboard & Analytics:** Visual insights into your revenue with interactive charts (weekly, monthly, yearly).
- **Customer Management:** Keep track of all your customers, along with their payment history (Total, Paid, and Unpaid amounts). 
- **Invoice Generation:** 
  - Create, view, and manage invoices easily.
  - Download invoices as PDFs.
  - Dynamic invoice numbering with custom suffixes.
  - Add standard Bank Details and UPI QR codes to invoices for seamless payments.
- **Payment Tracking:** Mark invoices as Paid, Pending, or Quotation, and see real-time updates reflected in your customer's balances.

## 🛠️ Technology Stack

**Frontend:**
- **React (Vite)** - Fast, modern UI development.
- **Tailwind CSS & Material UI (MUI)** - For responsive, beautiful, and accessible design.
- **React Router** - For smooth, client-side routing.
- **jsPDF & html2canvas** - To generate downloadable, pixel-perfect PDF invoices.
- **react-qr-code** - To display UPI QR codes for instant customer payments.
- **Axios** - For making robust HTTP requests to the backend.

**Backend:**
- **Node.js & Express.js** - Scalable backend architecture.
- **MongoDB & Mongoose** - Flexible NoSQL database and object modeling.
- **JWT & bcrypt** - For secure user sessions and password hashing.
- **Multer & ImageKit** - For handling image and file uploads.

## ⚙️ How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Rakshit992005/BillMan.git
cd BillMan
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file inside the `Backend` directory and define your environment variables:
```env
PORT=8000
MONGODB_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
# Add your ImageKit configuration if applicable
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend
npm install
```
Create a `.env` file inside the `Frontend` directory (if required) for your API URL:
```env
VITE_API_URL=http://localhost:8000
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Open in Browser
Visit `http://localhost:5173` to see the application in action.

## 🤝 Contributing
Contributions are always welcome. Feel free to fork the repository, make your changes, and submit a pull request!
