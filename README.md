# Expense Tracker App 📱💾

A sleek, modern mobile application built with **React Native** and **Expo Go** designed for localized personal finance management. Track your income, organize day-to-day expenditures, and view dynamic balance distributions natively on your device without reliance on heavy backend infrastructure.

---

## ✨ Key Features

* **Offline First Experience:** Full state persistence locally using phone storage—never lose your logged transactions even without an internet connection.
* **Dynamic Visual Filters:** Effortlessly sift through financial logs by category using an inline interactive filter bar layout.
* **Aesthetic UI Architecture:** Built on global style wrappers featuring high-contrast indicator components (e.g., green for Income, red for Expenses).
* **Inline Editing Capabilities:** Update title tags, currency values, or transactional metadata parameters directly from a seamless details workbench.
* **Hardware Interface Layouts:** Responsively adjusted to clear device notch spaces and native hardware status trays across both iOS and Android profiles.

---

## 🛠️ Technical Stack

* **Framework:** React Native (Expo Managed Workflow)
* **Icons & Layouts:** `@expo/vector-icons` (Feather Icons pool configuration)
* **Local Storage Infrastructure:** `@react-native-async-storage/async-storage`
* **State Containers:** React Hooks (`useState`, `useEffect`) passed across view stacks via React Navigation routing parameters.

---

## 🚀 Getting Started

Follow these steps to set up the development workspace and deploy the code on your physical testing device:

### 1. Prerequisites

Ensure you have **Node.js** (v18+ recommended) installed on your computer.

### 2. Installation

Clone the repository and run the package manager within the root directory terminal to install project elements:

```bash
# Install dependencies
npm install

```

### 3. Native Packages Required

Verify that the core storage and native interface packages are loaded safely inside your dependencies pool:

```bash
# Add Async Storage
npx expo install @react-native-async-storage/async-storage

# Add Error Boundary tracking checks (Optional Diagnostic Setup)
npx expo install react-native-error-boundary

```

### 4. Running the App

Initiate the Expo Metro Bundler compiler:

```bash
npx expo start

```

* **For Android Emulator:** Press `a` in your terminal workspace.
* **For iOS Simulator:** Press `i` in your terminal workspace.
* **For Physical Testing:** Install the **Expo Go** application from the App Store / Play Store on your phone, and scan the terminal QR code.

---

## 📂 Project Architecture

```text
├── App.js                   # Root App Container & Safe Error Wrapper
└── src
    ├── components
    │   ├── BalanceCard.js   # Dynamic calculation visual component
    │   ├── CustomButton.js  # Floating Action Trigger Button
    │   ├── CustomInput.js   # Custom Form Field Element
    │   ├── ExpenseItem.js   # Transaction item grid list row 
    │   ├── ExpenseList.js   # FlatList list container bridge
    │   ├── FilterBar.js     # Horizontal scroll filter panel
    │   └── ScreenHeader.js  # Clean back action hardware header
    ├── data
    │   └── expenses.js      # Mock dummy schema records
    └── screens
        ├── HomeScreen.js    # Primary Dashboard Interface
        ├── AddExpenseScreen.js # Create transaction screen
        └── ExpenseDetailScreen.js # Inline editor details node

```

---

## 💡 Implementation Notes

* **Currency Optimization:** System fields are optimized explicitly to calculate absolute parameters using **ETB** formatting frameworks.
* **Touch Targets:** Interactive row cells and standard back arrows are embedded within standardized dimension layouts to maintain high tap-accuracy parameters across hardware screens.
