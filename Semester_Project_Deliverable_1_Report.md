ASSIGNMENT NO 3

WEB ENGINEERING

Areeba Ulfat (23010101-113)
Hadia Waryah (23010101-134)
Instructor: Sir Museb Khalid
6th Semester (Blue)
Title: Sign Language Translation System





Department of Software Engineering
University of Sialkot




Sign Language Translation System


Abstract

This report presents the client-side architecture of the Sign Language Translation System, a Vue 3 and Vite based single page application. The purpose of the system is to provide a user interface where sign language gestures can be translated into readable text, viewed in a dashboard, searched through history, and configured through application settings. The first deliverable focuses only on the frontend implementation. Backend configuration with Express.js and MongoDB is planned for later phases. The application demonstrates Vue Router based SPA navigation, modular component design, props-based parent-to-child data flow, and custom events for child-to-parent communication.

Keywords: Vue 3, Vite, Vue Router, Components, Props, Emits, Sign Language Translation.

I. Introduction

Sign language is an important communication method for many people with hearing or speech disabilities. The Sign Language Translation System is designed as a web-based interface that simulates the structure of an AI powered gesture recognition platform. In this first deliverable, the project implements the complete client-side frontend using Vue 3 and Vite.

The application includes public pages such as Home, About, Contact, Login, and Register. It also includes authenticated pages such as Dashboard, Translate, History, Profile, and Settings. Since the backend phase is not yet included, authentication, settings, and history are handled on the client side using Vue composables and browser localStorage.

 II. Project Objectives

The main objectives of this deliverable are:

1. To implement a complete Vue 3 frontend using Vite.
2. To configure Vue Router for single page application navigation.
3. To divide the interface into reusable Vue components.
4. To demonstrate props for parent-to-child data transfer.
5. To demonstrate custom events using `define Emits` for child-to-parent communication.
6. To provide an organized project structure that can be extended with Express.js and MongoDB in later deliverables.

II. Tools and Technologies

The following tools and technologies are used in the project:
Technology PurposeVue 3Frontend JavaScript frameworkViteDevelopment server and build toolVue RouterSPA routing and navigationBootstrap| Responsive styling utilitiesBootstrap iconsInterface iconsJavaScriptApplication logicCSSCustom layout and stylingLocatStorageTemporary client-side persistence
 IV. Client-Side Architecture

The project follows a modular Vue architecture. Page-level files are stored in the src/views directory, while reusable UI elements are stored in the src/components directory. Shared frontend logic is placed inside src/composables.

A. Main Architecture Tree

sign-language-translation-system/
|-- index.html
|-- package.json
|-- vite.config.js
|-- src/
    |-- main.js
    |-- App.vue
    |-- router/
    |   |-- index.js
    |-- assets/
    |   |-- style.css
    |   |-- icons/
    |   |-- images/
    |   |-- SLTS p1.webp
    |   |-- SLTS p2.webp
    |   |-- SLTS p3.jpeg
    |-- composables/
    |   |-- useAuth.js
    |   |-- useHistory.js
    |   |-- useSettings.js
    |-- views/
    |   |-- Home.vue
    |   |-- About.vue
    |   |-- Contact.vue
    |   |-- Login.vue
    |   |-- Register.vue
    |   |-- Dashboard.vue
    |   |-- Translate.vue
    |   |-- History.vue
    |   |-- ProfileInfo.vue
    |   |-- Settings.vue
    |-- components/
        |-- Navbar.vue
        |-- Sidebar.vue
        |-- Footer.vue
        |-- HeroSection.vue
        |-- FeatureSection.vue
        |-- AboutSection.vue
        |-- ContactSection.vue
        |-- LoginForm.vue
        |-- RegisterForm.vue
        |-- BaseCard.vue
        |-- CameraFeed.vue
        |-- Translation.vue
        |-- TranslateButton.vue
        |-- HistorySearch.vue
        |-- HistoryTable.vue
        |-- SettingsPanel.vue
        |-- ProfileCard.vue
        |-- InfoCard.vue
        |-- GestureCard.vue
```

B. Application Entry Point

The application starts from src/main.js. It creates the Vue application, installs the router, loads global CSS, imports Bootstrap styling, initializes settings, and mounts the application to the HTML element with the id app.


```


C. Root Layout

The root component App.vue provides the main layout wrapper. It uses Navbar, Sidebar, Footer, and router-view. The navbar and sidebar are hidden on Login and Register pages so that authentication pages appear as focused full-screen forms.

<template>
  <div class="app-container">
    <Navbar v-if="showShell" />

    <div class="layout">
      <Sidebar v-if="showShell" />

      <main class="content">
        <router-view />
      </main>
    </div>

    <Footer />
  </div>
</template>

 V. SPA Routing Implementation

Vue Router is configured in src/router/index.js. Each important page has a separate route. Public routes include Home, About, Login, Register, and Contact. Protected routes include Dashboard, Translate, History, Profile, and Settings.

               





B. Route Guard

The project uses a navigation guard to restrict protected pages. If a user is not authenticated and tries to open a protected route, the router redirects the user to the Login page.



This satisfies the SPA routing requirement because navigation is handled through Vue Router without reloading the page.

VI. Modular Component Architecture

The frontend is divided into reusable components. This makes the project easier to maintain and extend.

A. View Components

View components represent complete pages:
ViewPurposeHome.vueLanding page with hero and feature sectionsLogin.vue| Login page wrapperRegisster.vue| Registration page wrapperDashboard.vueShows statistics, camera preview, and translation resultTranslate.vueMain translation interfaceHistory.vue| Searchable translation historySetting.vueApplication setting pageProfile.vueUser profile pageAbout.vueProject information pageContact.vueContact page
 B. Reusable Components

Reusable components are used across multiple views:
ComponentPurpose
| Component | Purpose |
|---|---|
| `Navbar.vue` | Top navigation |
| `Sidebar.vue` | Authenticated side navigation |
| `Footer.vue` | Footer area |
| `BaseCard.vue` | Dashboard statistic cards |
| `CameraFeed.vue` | Camera preview interface |
| `Translation.vue` | Translation result card |
| `TranslateButton.vue` | Button that triggers translation |
| `HistorySearch.vue` | Search input for translation history |
| `HistoryTable.vue` | Displays history records |
| `SettingsPanel.vue` | User settings controls |
| `LoginForm.vue` | Login form logic and layout |
| `RegisterForm.vue` | Registration form logic and layout |
| `ProfileCard.vue` | User profile display |

This structure follows the Vue principle of separating page-level views from reusable user interface components.

VII. Props and Custom Events

The project demonstrates inter-component communication using props and custom events.
A. Props: Parent-to-Child Communication

In `Translate.vue`, the parent component sends translation data into the child `Translation.vue` component through props.

```vue
<Translation
  :gesture="translation.gesture"
  :translation="translation.translation"
  :confidence="translation.confidence"
  :language="translation.language"
  :status="translation.status"
  :voiceEnabled="settings.voice"
  @speak="handleSpeak"
/>
```

Inside Translation.vue, these values are declared with defineProps. Each prop has a type and default value.



Another example is HistorySearch.vue, where the search query is passed from the parent view to the child input component:

```vue
<HistorySearch :query="query" @search="onSearch" />
```

 B. Emits: Child-to-Parent Communication

The TranslateButton.vue component emits a custom `translate` event when the user clicks the button.
This shows correct upward communication from child components to parent views.

VIII. Client-Side State Management

The project uses Vue composables for reusable state logic. This approach keeps the state organized without adding a heavier state library for the first deliverable.

 A. Authentication State

`useAuth.js` stores authentication state and user information in localStorage. It provides `login`, `register`, and `logout` functions.

B. History State

`useHistory.js` stores translation history and provides `addHistoryItem`. History is saved to localStorage when the `autoSaveHistory` setting is enabled.

C. Settings State

`useSettings.js` manages theme, language, camera resolution, notifications, voice output, auto-save history, and confidence threshold. It also applies the selected theme to the document body.

 IX. Main Functional Pages

A. Home Page

The Home page uses `HeroSection.vue` and `FeatureSection.vue` to introduce the system and its main features.

B. Authentication Pages

The Login and Register pages use `LoginForm.vue` and `RegisterForm.vue`. The forms validate user input on the client side and then update local authentication state.

C. Dashboard Page

The Dashboard page shows system statistics through `BaseCard.vue`, a camera preview through `CameraFeed.vue`, and a translation output card through `Translation.vue`.

D. Translate Page

The Translate page is the main functional screen. It includes a camera preview, translation result, custom gesture form, translate button, history search, and history table. It demonstrates props, emits, computed filtering, reactive state, and composables.

E. History Page

The History page displays saved translations and allows users to search previous results. It uses `HistorySearch.vue` and `HistoryTable.vue`.

F. Settings Page

The Settings page uses `SettingsPanel.vue` to let the user change theme, language, camera resolution, notifications, voice output, auto-save history, and confidence threshold.

X. Screenshots

The following screenshots should be included in the final PDF or Word submission as documented evidence that the application runs locally on `localhost`.

Figure 1. Home page running on localhost




Figure 2. Login page running on localhost


Figure 3. Dashboard page after login 





Figure 4. Translate page with camera preview and translation result







Figure 5. History page with searchable translation table



Figure 6. Settings page





Figure 7. Contact Page




Figure 8. Profile Page



Figure 9. About Page


Recommended local command:

Bash:  npm run dev

Recommended local URL:  http://localhost:5173

XI. Testing and Verification

The following client-side checks were performed or should be performed during demonstration:

1. The application opens successfully on localhost.
2. Public routes such as Home, About, Contact, Login, and Register are accessible.
3. Protected routes redirect unauthenticated users to Login.
4. Login and Register update the authentication state.
5. The Dashboard displays statistic cards and translation result.
6. The Translate page updates translation output from user input.
7. The Translate button emits an event to the parent component.
8. The History search filters records using a computed property.
9. The Settings page updates and saves user preferences.
10. Navigation works through `RouterLink` and `RouterView` without full page refresh.


XII. Conclusion

The Sign Language Translation System successfully implements the required client-side architecture for Deliverable 1. The application is built with Vue 3 and Vite, uses Vue Router for SPA navigation, and is divided into clean page and reusable component directories. It demonstrates component communication through props and custom events, uses composables for reusable frontend state, and provides a complete interface that can later be connected to an Express.js and MongoDB backend. The current frontend is ready for demonstration and further backend integration in the next project phase.

References

[1] Vue.js, "Vue.js Documentation," Vue.js, 2026. [Online]. Available: https://vuejs.org/  
[2] Vue Router, "Vue Router Documentation," Vue.js, 2026. [Online]. Available: https://router.vuejs.org/  
[3] Vite, "Vite Documentation," Vite, 2026. [Online]. Available: https://vite.dev/  
[4] Bootstrap, "Bootstrap Documentation," Bootstrap, 2026. [Online]. Available: https://getbootstrap.com/  

2


