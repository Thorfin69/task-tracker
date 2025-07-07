# 📝 Personal Task Tracker

A simple and responsive task tracking app built using **React**, **localStorage**, and **modern UI components**. Create, update, complete, filter, and delete tasks with a clean user experience — no database required!

## 🚀 Features

- 🔐 Login with a username (stored in `localStorage`)
- ✅ Add, edit, and delete tasks
- 📌 Mark tasks as completed or pending
- 🔍 Filter tasks by **All**, **Pending**, and **Completed**
- 💾 All data saved in your browser (no backend required)
- 🌈 Gradient UI, toast notifications, and animations
- 📱 Fully responsive layout

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**
- **localStorage** for persistent data
- Custom components: `TaskForm`, `TaskList`, `TaskItem`, `TaskFilter`, `Toast`, etc.

## 📸 Screenshots

> _Coming Soon — drop screenshots of your UI here if needed._

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── TaskFilter.jsx
│   └── ui/
│       └── Toast.jsx
│
├── styles/
│   └── App.css
│
├── utils/
│   └── localStorage.js
│
└── main.jsx
```

## 🧠 How It Works

- The user logs in with a username (saved in `localStorage`)
- The app loads all tasks from `localStorage`
- Tasks can be added via `TaskForm`, displayed via `TaskList`, and toggled or edited using `TaskItem`
- A toast (`Toast.jsx`) appears in the bottom-right when actions occur (like “Task completed”)

## 🧪 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open `http://localhost:5173` to view the app.

## 📦 Build for Production

```bash
npm run build
```

## ⚙️ Customization

You can tweak:

- Colors and UI in `App.css` and Tailwind classes
- Toast animation/timing in `Toast.jsx`
- User handling logic in `localStorage.js`

## 🙋 FAQ

### Q: Is this secure for real user data?
> No. It's just for demo/local use. Data is saved in the browser only.

### Q: Will tasks be saved after refresh?
> Yes! They persist using `localStorage`.

## 👨‍💻 Author

Made with ❤️ by Vikas

> Want to customize the design, add a backend (like Firebase), or sync across devices? Fork this and go wild!
