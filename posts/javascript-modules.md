---

title:
  vi: "JavaScript Modules - Tổ chức code chuyên nghiệp"
  en: "JavaScript Modules - Professional Code Organization"
date: "2025-12-20"
excerpt:
  vi: "Khám phá hệ thống modules trong JavaScript - từ CommonJS, ES6 modules, đến bundlers hiện đại như webpack và vite."
  en: "Explore the module system in JavaScript - from CommonJS, ES6 modules, to modern bundlers like webpack and vite."
category:
  vi: "JavaScript"
  en: "JavaScript"
tags: ["JavaScript", "Modules", "ES6", "CommonJS", "Webpack", "Bundlers"]
image: "/images/blog/error.png"
content:
  vi: |
    ## Khi mình nhận ra "global scope" là ác mộng

    Xin chào các bạn! Hôm nay mình muốn chia sẻ về hành trình học JavaScript Modules - một chủ đề tưởng chừng kỹ thuật nhưng thực ra thay đổi hoàn toàn cách mình code. Lúc đầu mình nghĩ "module là gì khó đâu", nhưng khi làm project thực tế mới vỡ lẽ: modules là cách duy nhất để maintain large-scale applications.

    Mình còn nhớ project đầu tiên: một e-commerce website với 20+ JavaScript files. Tất cả variables, functions đều global. Kết quả? Name collisions, bugs khó debug, code impossible to maintain. Mình mất cả tuần để refactor thành modules. Đó là turning point: từ "spaghetti code" thành "organized architecture".

    Bài viết này tổng hợp những gì mình học về JavaScript modules, từ basic đến advanced.

    ## The Problem: Global Scope Chaos

    Trước khi có modules, JavaScript chỉ có global scope. Tất cả variables, functions đều global. Nghe có vẻ tiện, nhưng thực tế là disaster:

    ```javascript
    // file1.js
    var userName = 'Minh';

    // file2.js
    var userName = 'Lan'; // Override file1's variable!

    function calculateTotal() { /* ... */ }

    // file3.js
    function calculateTotal() { /* Different logic! */ } // Override!
    ```

    **Consequences:**
    - Name collisions
    - Unpredictable bugs
    - Impossible to reuse code
    - Difficult testing
    - No encapsulation

    Mình từng debug project cả ngày vì global variable conflicts. Đó là lúc mình quyết định học modules.

    ## CommonJS - Node.js Module System

    Khi làm backend với Node.js, mình gặp CommonJS. Đây là module system đầu tiên mình học.

    **Cách dùng:**
    ```javascript
    // math.js
    function add(a, b) {
      return a + b;
    }

    function subtract(a, b) {
      return a - b;
    }

    module.exports = {
      add,
      subtract
    };

    // app.js
    const math = require('./math');
    console.log(math.add(5, 3)); // 8
    ```

    **Require vs Exports:**
    - `require()`: Import modules
    - `module.exports`: Export từ module
    - `exports`: Shortcut cho module.exports

    **Điều làm mình ấn tượng:** Synchronous loading. Perfect cho server-side code.

    ## ES6 Modules - Modern Standard

    ES6 modules thay đổi everything. Syntax clean, static analysis possible, tree-shaking friendly.

    **Named exports:**
    ```javascript
    // utils.js
    export function formatDate(date) {
      return date.toLocaleDateString();
    }

    export const API_URL = 'https://api.example.com';

    export class User {
      constructor(name) {
        this.name = name;
      }
    }

    // app.js
    import { formatDate, API_URL, User } from './utils.js';
    ```

    **Default export:**
    ```javascript
    // logger.js
    export default function log(message) {
      console.log(`[LOG] ${message}`);
    }

    // app.js
    import log from './logger.js';
    log('Hello world');
    ```

    **Mixed exports:**
    ```javascript
    // api.js
    export function getUsers() { /* ... */ }
    export function createUser() { /* ... */ }

    export default {
      baseURL: 'https://api.example.com',
      timeout: 5000
    };

    // app.js
    import api, { getUsers, createUser } from './api.js';
    ```

    **Aliases:**
    ```javascript
    import {
      formatDate as format,
      API_URL as url
    } from './utils.js';
    ```

    ## Dynamic Imports - Code Splitting

    ES2020 dynamic imports cho phép lazy loading modules.

    ```javascript
    // Conditional loading
    if (user.isAdmin) {
      import('./admin-panel.js').then(module => {
        module.showAdminPanel();
      });
    }

    // Async function
    async function loadDashboard() {
      const dashboard = await import('./dashboard.js');
      dashboard.render();
    }
    ```

    **Benefits:**
    - Smaller initial bundle
    - Faster page load
    - On-demand loading

    ## Module Bundlers - Webpack, Vite, Rollup

    Browser không support ES6 modules natively. Cần bundlers để convert thành compatible code.

    ### Webpack - The Veteran

    Webpack là bundler đầu tiên mình học. Powerful nhưng complex.

    **Basic config:**
    ```javascript
    // webpack.config.js
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      }
    };
    ```

    **Loaders:** Transform code (Babel, CSS, images)
    **Plugins:** Optimize bundles, generate HTML, etc.

    ### Vite - Modern Alternative

    Vite nhanh hơn webpack, especially development.

    **Vite config:**
    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'

    export default defineConfig({
      build: {
        rollupOptions: {
          input: {
            main: './index.html',
            admin: './admin.html'
          }
        }
      }
    })
    ```

    **Why Vite faster:**
    - ES modules in development
    - On-demand compilation
    - Faster HMR

    ## Tree Shaking - Remove Unused Code

    Modern bundlers có thể detect và remove unused exports.

    ```javascript
    // utils.js
    export function usedFunction() {
      return 'I am used';
    }

    export function unusedFunction() {
      return 'I am not used';
    }

    // app.js
    import { usedFunction } from './utils.js';
    // unusedFunction sẽ bị remove trong production build
    ```

    **Result:** Smaller bundle size, faster load times.

    ## Module Resolution - Import Paths

    JavaScript có nhiều ways để specify module paths.

    **Relative paths:**
    ```javascript
    import utils from './utils.js';
    import config from '../config.js';
    ```

    **Absolute paths:**
    ```javascript
    import api from '/src/api.js';
    import utils from '@/utils.js'; // Alias
    ```

    **Node modules:**
    ```javascript
    import React from 'react';
    import { map } from 'lodash';
    ```

    **Path mapping trong webpack:**
    ```javascript
    // webpack.config.js
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/components')
      }
    }
    ```

    ## Circular Dependencies - The Nightmare

    Circular imports có thể cause problems.

    ```javascript
    // a.js
    import { b } from './b.js';
    export const a = 'a';

    // b.js
    import { a } from './a.js';
    export const b = 'b';
    ```

    **Solutions:**
    - Restructure code
    - Use dynamic imports
    - Move shared code to separate module

    ## Module Patterns - Organization Strategies

    Nhiều patterns để organize modules effectively.

    ### File-based Modules

    ```
    src/
    ├── components/
    │   ├── Button.js
    │   ├── Input.js
    │   └── Modal.js
    ├── utils/
    │   ├── api.js
    │   ├── validation.js
    │   └── formatting.js
    └── index.js
    ```

    ### Feature-based Modules

    ```
    src/
    ├── features/
    │   ├── auth/
    │   │   ├── components/
    │   │   ├── utils/
    │   │   └── index.js
    │   ├── dashboard/
    │   └── products/
    └── shared/
    ```

    ### Barrel Exports

    ```javascript
    // components/index.js
    export { default as Button } from './Button';
    export { default as Input } from './Input';
    export { default as Modal } from './Modal';

    // Usage
    import { Button, Input, Modal } from './components';
    ```

    ## Testing Modules

    Modules làm testing dễ hơn.

    ```javascript
    // math.js
    export function add(a, b) {
      return a + b;
    }

    // math.test.js
    import { add } from './math.js';

    test('adds 1 + 2 to equal 3', () => {
      expect(add(1, 2)).toBe(3);
    });
    ```

    **Mocking modules:**
    ```javascript
    import { jest } from '@jest/globals';

    jest.mock('./api.js');
    import { fetchData } from './api.js';
    import { processData } from './dataProcessor.js';
    ```

    ## Performance Optimization

    Modules có thể optimize performance.

    **Code splitting:**
    ```javascript
    // Dynamic imports for routes
    const routes = {
      '/dashboard': () => import('./pages/Dashboard.js'),
      '/profile': () => import('./pages/Profile.js'),
      '/admin': () => import('./pages/Admin.js')
    };
    ```

    **Lazy loading components:**
    ```javascript
    const LazyComponent = lazy(() =>
      import('./HeavyComponent.js')
    );
    ```

    ## Migration Strategies

    Migrate từ non-modular code sang modules.

    **Phase 1: Identify dependencies**
    ```javascript
    // Before
    <script src="jquery.js"></script>
    <script src="utils.js"></script>
    <script src="app.js"></script>

    // After
    import $ from 'jquery';
    import { utils } from './utils.js';
    ```

    **Phase 2: Create barrel exports**

    **Phase 3: Update build system**

    ## Những gì mình học được sau 3 năm làm JavaScript

    Modules không chỉ là "organize code" - mà là foundation của scalable applications.

    **Code maintainability:** Clear boundaries, easy refactoring.

    **Reusability:** Modules có thể share across projects.

    **Testing:** Isolated units, easy mocking.

    **Performance:** Tree shaking, code splitting.

    **Developer experience:** Better IDE support, faster development.

    JavaScript modules dạy mình: good architecture không phải là option - mà là requirement cho long-term success.

    Nếu bạn đang build JavaScript applications, modules là must-learn. Start small: organize utilities into modules, then scale up to feature modules. Your future self will thank you.

    *P.S: Modules là bridge từ "works" sang "maintainable". Master chúng ngay!*
  en: |
    ## When I Realized "Global Scope" is a Nightmare

    Hello everyone! Today I want to share my journey learning JavaScript Modules - a topic that seems technical but actually completely changes how I code. Initially I thought "modules aren't hard", but when working on real projects I realized: modules are the only way to maintain large-scale applications.

    I still remember my first project: an e-commerce website with 20+ JavaScript files. All variables and functions were global. Result? Name collisions, hard-to-debug bugs, impossible-to-maintain code. I spent a whole week refactoring into modules. That was the turning point: from "spaghetti code" to "organized architecture".

    This article compiles everything I've learned about JavaScript modules, from basic to advanced.

    ## The Problem: Global Scope Chaos

    Before modules existed, JavaScript only had global scope. All variables and functions were global. Sounds convenient, but in practice it's a disaster:

    ```javascript
    // file1.js
    var userName = 'Minh';

    // file2.js
    var userName = 'Lan'; // Override file1's variable!

    function calculateTotal() { /* ... */ }

    // file3.js
    function calculateTotal() { /* Different logic! */ } // Override!
    ```

    **Consequences:**
    - Name collisions
    - Unpredictable bugs
    - Impossible to reuse code
    - Difficult testing
    - No encapsulation

    I once debugged a project for a whole day because of global variable conflicts. That's when I decided to learn modules.

    ## CommonJS - Node.js Module System

    When doing backend with Node.js, I encountered CommonJS. This was the first module system I learned.

    **How to use:**
    ```javascript
    // math.js
    function add(a, b) {
      return a + b;
    }

    function subtract(a, b) {
      return a - b;
    }

    module.exports = {
      add,
      subtract
    };

    // app.js
    const math = require('./math');
    console.log(math.add(5, 3)); // 8
    ```

    **Require vs Exports:**
    - `require()`: Import modules
    - `module.exports`: Export from module
    - `exports`: Shortcut for module.exports

    **What impressed me:** Synchronous loading. Perfect for server-side code.

    ## ES6 Modules - Modern Standard

    ES6 modules changed everything. Clean syntax, static analysis possible, tree-shaking friendly.

    **Named exports:**
    ```javascript
    // utils.js
    export function formatDate(date) {
      return date.toLocaleDateString();
    }

    export const API_URL = 'https://api.example.com';

    export class User {
      constructor(name) {
        this.name = name;
      }
    }

    // app.js
    import { formatDate, API_URL, User } from './utils.js';
    ```

    **Default export:**
    ```javascript
    // logger.js
    export default function log(message) {
      console.log(`[LOG] ${message}`);
    }

    // app.js
    import log from './logger.js';
    log('Hello world');
    ```

    **Mixed exports:**
    ```javascript
    // api.js
    export function getUsers() { /* ... */ }
    export function createUser() { /* ... */ }

    export default {
      baseURL: 'https://api.example.com',
      timeout: 5000
    };

    // app.js
    import api, { getUsers, createUser } from './api.js';
    ```

    **Aliases:**
    ```javascript
    import {
      formatDate as format,
      API_URL as url
    } from './utils.js';
    ```

    ## Dynamic Imports - Code Splitting

    ES2020 dynamic imports allow lazy loading of modules.

    ```javascript
    // Conditional loading
    if (user.isAdmin) {
      import('./admin-panel.js').then(module => {
        module.showAdminPanel();
      });
    }

    // Async function
    async function loadDashboard() {
      const dashboard = await import('./dashboard.js');
      dashboard.render();
    }
    ```

    **Benefits:**
    - Smaller initial bundle
    - Faster page load
    - On-demand loading

    ## Module Bundlers - Webpack, Vite, Rollup

    Browsers don't support ES6 modules natively. Need bundlers to convert to compatible code.

    ### Webpack - The Veteran

    Webpack was the first bundler I learned. Powerful but complex.

    **Basic config:**
    ```javascript
    // webpack.config.js
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      }
    };
    ```

    **Loaders:** Transform code (Babel, CSS, images)
    **Plugins:** Optimize bundles, generate HTML, etc.

    ### Vite - Modern Alternative

    Vite is faster than webpack, especially in development.

    **Vite config:**
    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'

    export default defineConfig({
      build: {
        rollupOptions: {
          input: {
            main: './index.html',
            admin: './admin.html'
          }
        }
      }
    })
    ```

    **Why Vite is faster:**
    - ES modules in development
    - On-demand compilation
    - Faster HMR

    ## Tree Shaking - Remove Unused Code

    Modern bundlers can detect and remove unused exports.

    ```javascript
    // utils.js
    export function usedFunction() {
      return 'I am used';
    }

    export function unusedFunction() {
      return 'I am not used';
    }

    // app.js
    import { usedFunction } from './utils.js';
    // unusedFunction will be removed in production build
    ```

    **Result:** Smaller bundle size, faster load times.

    ## Module Resolution - Import Paths

    JavaScript has many ways to specify module paths.

    **Relative paths:**
    ```javascript
    import utils from './utils.js';
    import config from '../config.js';
    ```

    **Absolute paths:**
    ```javascript
    import api from '/src/api.js';
    import utils from '@/utils.js'; // Alias
    ```

    **Node modules:**
    ```javascript
    import React from 'react';
    import { map } from 'lodash';
    ```

    **Path mapping in webpack:**
    ```javascript
    // webpack.config.js
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/components')
      }
    }
    ```

    ## Circular Dependencies - The Nightmare

    Circular imports can cause problems.

    ```javascript
    // a.js
    import { b } from './b.js';
    export const a = 'a';

    // b.js
    import { a } from './a.js';
    export const b = 'b';
    ```

    **Solutions:**
    - Restructure code
    - Use dynamic imports
    - Move shared code to separate module

    ## Module Patterns - Organization Strategies

    Many patterns to organize modules effectively.

    ### File-based Modules

    ```
    src/
    ├── components/
    │   ├── Button.js
    │   ├── Input.js
    │   └── Modal.js
    ├── utils/
    │   ├── api.js
    │   ├── validation.js
    │   └── formatting.js
    └── index.js
    ```

    ### Feature-based Modules

    ```
    src/
    ├── features/
    │   ├── auth/
    │   │   ├── components/
    │   │   ├── utils/
    │   │   └── index.js
    │   ├── dashboard/
    │   └── products/
    └── shared/
    ```

    ### Barrel Exports

    ```javascript
    // components/index.js
    export { default as Button } from './Button';
    export { default as Input } from './Input';
    export { default as Modal } from './Modal';

    // Usage
    import { Button, Input, Modal } from './components';
    ```

    ## Testing Modules

    Modules make testing easier.

    ```javascript
    // math.js
    export function add(a, b) {
      return a + b;
    }

    // math.test.js
    import { add } from './math.js';

    test('adds 1 + 2 to equal 3', () => {
      expect(add(1, 2)).toBe(3);
    });
    ```

    **Mocking modules:**
    ```javascript
    import { jest } from '@jest/globals';

    jest.mock('./api.js');
    import { fetchData } from './api.js';
    import { processData } from './dataProcessor.js';
    ```

    ## Performance Optimization

    Modules can optimize performance.

    **Code splitting:**
    ```javascript
    // Dynamic imports for routes
    const routes = {
      '/dashboard': () => import('./pages/Dashboard.js'),
      '/profile': () => import('./pages/Profile.js'),
      '/admin': () => import('./pages/Admin.js')
    };
    ```

    **Lazy loading components:**
    ```javascript
    const LazyComponent = lazy(() =>
      import('./HeavyComponent.js')
    );
    ```

    ## Migration Strategies

    Migrate from non-modular code to modules.

    **Phase 1: Identify dependencies**
    ```javascript
    // Before
    <script src="jquery.js"></script>
    <script src="utils.js"></script>
    <script src="app.js"></script>

    // After
    import $ from 'jquery';
    import { utils } from './utils.js';
    ```

    **Phase 2: Create barrel exports**

    **Phase 3: Update build system**

    ## What I Learned After 3 Years of JavaScript Development

    Modules are not just "organizing code" - but the foundation of scalable applications.

    **Code maintainability:** Clear boundaries, easy refactoring.

    **Reusability:** Modules can be shared across projects.

    **Testing:** Isolated units, easy mocking.

    **Performance:** Tree shaking, code splitting.

    **Developer experience:** Better IDE support, faster development.

    JavaScript modules taught me: good architecture is not optional - but a requirement for long-term success.

    If you're building JavaScript applications, modules are must-learn. Start small: organize utilities into modules, then scale up to feature modules. Your future self will thank you.

    *P.S: Modules are the bridge from "works" to "maintainable". Master them now!*
