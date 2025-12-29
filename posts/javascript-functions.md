---

title:
  vi: "JavaScript Functions - Trái tim của lập trình"
  en: "JavaScript Functions - The Heart of Programming"
date: "2025-11-25"
excerpt:
  vi: "Khám phá sâu về JavaScript Functions - từ function declarations, expressions, đến arrow functions, closures, và higher-order functions."
  en: "Deep dive into JavaScript Functions - from function declarations, expressions, to arrow functions, closures, and higher-order functions."
category:
  vi: "JavaScript"
  en: "JavaScript"
tags: ["JavaScript", "Functions", "Closures", "Higher-Order Functions", "Arrow Functions"]
image: "/images/blog/pattern.jpg"
content:
  vi: |
    ## Khi mình nhận ra "function" không chỉ là "hàm"

    Xin chào các bạn! Hôm nay mình muốn chia sẻ về hành trình học JavaScript Functions - một chủ đề tưởng chừng đơn giản nhưng ẩn chứa nhiều kiến thức sâu sắc. Lúc đầu mình nghĩ "function là gì khó đâu", nhưng khi code thực tế mới vỡ lẽ: functions là foundation của JavaScript programming.

    Mình còn nhớ ngày đầu tiên học JavaScript. Teacher nói về functions, mình nghĩ "đơn giản lắm, cứ viết function rồi gọi thôi". Nhưng khi làm project đầu tiên - một todo app, mình mới hiểu: functions không chỉ là code blocks, mà là cách tổ chức logic, reuse code, và handle complexity.

    Bài viết này là tổng hợp những gì mình học được về JavaScript functions, từ basic đến advanced concepts.

    ## Function Declaration vs Function Expression - Sự khác biệt tinh tế

    Lúc đầu mình confuse với 2 cách khai báo functions. "Tại sao có 2 cách? Cách nào tốt hơn?"

    **Function Declaration:**
    ```javascript
    function tinhTong(a, b) {
      return a + b;
    }
    ```

    **Function Expression:**
    ```javascript
    const tinhTong = function(a, b) {
      return a + b;
    };
    ```

    Sự khác biệt? Declaration được hoisted, expression thì không. Mình từng debug cả giờ vì gọi function trước khi declare. Bây giờ mình hiểu: Declaration an toàn hơn cho code structure.

    ## Arrow Functions - Syntax ngắn gọn nhưng khác biệt lớn

    ES6 arrow functions làm mình excited. Syntax ngắn gọn, nhưng behavior khác biệt hoàn toàn.

    ```javascript
    // Traditional function
    function tinhBinhPhuong(x) {
      return x * x;
    }

    // Arrow function
    const tinhBinhPhuong = (x) => x * x;

    // Arrow với nhiều statements
    const xuLyDuLieu = (data) => {
      console.log('Đang xử lý:', data);
      return data.toUpperCase();
    };
    ```

    **Điều làm mình "bất ngờ":** Arrow functions không có `this` riêng. Mình từng bug cả ngày vì `this` trong arrow function refer đến parent scope thay vì object hiện tại.

    ```javascript
    const obj = {
      name: 'Minh',
      greet: function() {
        setTimeout(function() {
          console.log('Hello ' + this.name); // undefined!
        }, 1000);
      }
    };
    ```

    Vs arrow function:
    ```javascript
    const obj = {
      name: 'Minh',
      greet: function() {
        setTimeout(() => {
          console.log('Hello ' + this.name); // "Minh"
        }, 1000);
      }
    };
    ```

    Bây giờ mình dùng arrow functions everywhere, nhưng luôn cẩn thận với `this`.

    ## Default Parameters - Giá trị mặc định thông minh

    ES6 default parameters cứu mình khỏi undefined errors.

    ```javascript
    function guiEmail(to, subject = 'No Subject', body = '') {
      console.log(`Sending to ${to}: ${subject}`);
      // Gửi email logic
    }

    guiEmail('minh@example.com'); // OK, dùng default values
    guiEmail('minh@example.com', 'Hello'); // Override subject
    ```

    Trước ES6, mình phải check undefined manually. Bây giờ code clean hơn nhiều.

    ## Rest Parameters - Tham số động

    Khi cần accept số lượng parameters không xác định:

    ```javascript
    function tinhTong(...numbers) {
      return numbers.reduce((sum, num) => sum + num, 0);
    }

    console.log(tinhTong(1, 2, 3)); // 6
    console.log(tinhTong(1, 2, 3, 4, 5)); // 15
    ```

    Rest parameters thay thế `arguments` object cũ. Mình thích vì nó là real array, có thể dùng map, filter, etc.

    ## Closures - Concept khó hiểu nhất của mình

    Closures là lúc mình đau đầu nhất. "Function trong function? Access outer variables?" - confuse lắm!

    ```javascript
    function createCounter() {
      let count = 0;

      return function() {
        count++;
        return count;
      };
    }

    const counter = createCounter();
    console.log(counter()); // 1
    console.log(counter()); // 2
    ```

    Inner function "remember" outer scope variables. Mình dùng closures cho private variables, tạo factory functions, và implement modules.

    **Private variables với closures:**
    ```javascript
    function createBankAccount(initialBalance) {
      let balance = initialBalance;

      return {
        deposit: function(amount) {
          balance += amount;
          return balance;
        },
        withdraw: function(amount) {
          if (balance >= amount) {
            balance -= amount;
            return balance;
          }
          return 'Insufficient funds';
        },
        getBalance: function() {
          return balance;
        }
      };
    }

    const account = createBankAccount(1000);
    account.deposit(500); // 1500
    console.log(account.balance); // undefined - private!
    ```

    Closures bây giờ là tool yêu thích của mình.

    ## Higher-Order Functions - Functions as Parameters

    Concept làm mình "wow" nhất: functions có thể nhận functions khác làm parameter.

    ```javascript
    function xuLyMang(arr, callback) {
      const result = [];
      for (let item of arr) {
        result.push(callback(item));
      }
      return result;
    }

    const numbers = [1, 2, 3, 4, 5];
    const squared = xuLyMang(numbers, x => x * x);
    console.log(squared); // [1, 4, 9, 16, 25]
    ```

    Array methods như map, filter, reduce đều là higher-order functions. Mình dùng chúng hàng ngày.

    **Custom map function:**
    ```javascript
    function myMap(arr, mapper) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(mapper(arr[i], i, arr));
      }
      return result;
    }

    const doubled = myMap([1, 2, 3], x => x * 2);
    console.log(doubled); // [2, 4, 6]
    ```

    ## Function Composition - Ghép functions lại với nhau

    Advanced technique: combine multiple functions thành một pipeline.

    ```javascript
    const compose = (...functions) => x =>
      functions.reduceRight((acc, fn) => fn(acc), x);

    const add = x => x + 1;
    const multiply = x => x * 2;
    const square = x => x * x;

    const complexCalc = compose(square, multiply, add);
    console.log(complexCalc(3)); // ((3 + 1) * 2)² = 64
    ```

    Function composition giúp code declarative và reusable.

    ## Immediately Invoked Function Expressions (IIFE)

    Pattern cũ nhưng vẫn hữu ích: function chạy ngay sau khi define.

    ```javascript
    (function() {
      const privateVar = 'Secret';
      console.log('IIFE executed');
    })();

    // Arrow version
    (() => {
      console.log('Arrow IIFE');
    })();
    ```

    Mình dùng IIFE để create private scope, tránh global pollution.

    ## Callbacks, Promises, và Async Functions

    Modern JavaScript: async functions kết hợp với callbacks và promises.

    ```javascript
    // Callback style
    function fetchUser(id, callback) {
      setTimeout(() => {
        callback({ id, name: 'User ' + id });
      }, 1000);
    }

    // Promise style
    function fetchUser(id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, name: 'User ' + id });
        }, 1000);
      });
    }

    // Async/await style
    async function getUserData() {
      try {
        const user = await fetchUser(1);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
    ```

    Async functions làm async code trông như sync code. Perfect!

    ## Những gì mình học được sau 2 năm code JavaScript

    Functions không chỉ là syntax - mà là programming paradigm. Từ basic functions đến advanced concepts như closures, higher-order functions - tất cả đều thay đổi cách mình think about code.

    **Code reusability:** Functions giúp break down complex problems thành smaller, manageable pieces.

    **Abstraction:** Hide implementation details, expose clean interfaces.

    **Composition:** Combine simple functions thành complex behaviors.

    **Maintainability:** Well-structured functions dễ test, debug, và maintain.

    JavaScript functions dạy mình: programming không chỉ là solve problems, mà là solve them elegantly.

    Nếu bạn đang học JavaScript, đừng skip functions. Hãy practice: viết functions, refactor code thành functions, experiment với closures. Functions sẽ trở thành best friend của bạn.

    *P.S: Functions là foundation của JavaScript. Master chúng, bạn sẽ code được mọi thứ!*
  en: |
    ## When I Realized "Function" is More Than Just "Function"

    Hello everyone! Today I want to share my journey learning JavaScript Functions - a topic that seems simple but contains profound knowledge. Initially I thought "functions aren't hard", but when coding in practice I realized: functions are the foundation of JavaScript programming.

    I still remember my first day learning JavaScript. Teacher talked about functions, I thought "very simple, just write function and call it". But when working on my first project - a todo app, I finally understood: functions are not just code blocks, but ways to organize logic, reuse code, and handle complexity.

    This article is a compilation of everything I've learned about JavaScript functions, from basic to advanced concepts.

    ## Function Declaration vs Function Expression - Subtle Differences

    Initially I was confused by the 2 ways to declare functions. "Why are there 2 ways? Which one is better?"

    **Function Declaration:**
    ```javascript
    function calculateSum(a, b) {
      return a + b;
    }
    ```

    **Function Expression:**
    ```javascript
    const calculateSum = function(a, b) {
      return a + b;
    };
    ```

    The difference? Declaration is hoisted, expression is not. I once debugged for hours because I called a function before declaring it. Now I understand: Declaration is safer for code structure.

    ## Arrow Functions - Concise Syntax but Big Differences

    ES6 arrow functions excited me. Concise syntax, but completely different behavior.

    ```javascript
    // Traditional function
    function calculateSquare(x) {
      return x * x;
    }

    // Arrow function
    const calculateSquare = (x) => x * x;

    // Arrow with multiple statements
    const processData = (data) => {
      console.log('Processing:', data);
      return data.toUpperCase();
    };
    ```

    **What surprised me:** Arrow functions don't have their own `this`. I once had bugs for a whole day because `this` in arrow function refers to parent scope instead of current object.

    ```javascript
    const obj = {
      name: 'Minh',
      greet: function() {
        setTimeout(function() {
          console.log('Hello ' + this.name); // undefined!
        }, 1000);
      }
    };
    ```

    With arrow function:
    ```javascript
    const obj = {
      name: 'Minh',
      greet: function() {
        setTimeout(() => {
          console.log('Hello ' + this.name); // "Minh"
        }, 1000);
      }
    };
    ```

    Now I use arrow functions everywhere, but I'm always careful with `this`.

    ## Default Parameters - Smart Default Values

    ES6 default parameters saved me from undefined errors.

    ```javascript
    function sendEmail(to, subject = 'No Subject', body = '') {
      console.log(`Sending to ${to}: ${subject}`);
      // Send email logic
    }

    sendEmail('minh@example.com'); // OK, uses default values
    sendEmail('minh@example.com', 'Hello'); // Override subject
    ```

    Before ES6, I had to manually check for undefined. Now code is much cleaner.

    ## Rest Parameters - Dynamic Parameters

    When you need to accept an undetermined number of parameters:

    ```javascript
    function calculateSum(...numbers) {
      return numbers.reduce((sum, num) => sum + num, 0);
    }

    console.log(calculateSum(1, 2, 3)); // 6
    console.log(calculateSum(1, 2, 3, 4, 5)); // 15
    ```

    Rest parameters replace the old `arguments` object. I like it because it's a real array, can use map, filter, etc.

    ## Closures - My Hardest Concept to Understand

    Closures gave me the biggest headache. "Function inside function? Access outer variables?" - so confusing!

    ```javascript
    function createCounter() {
      let count = 0;

      return function() {
        count++;
        return count;
      };
    }

    const counter = createCounter();
    console.log(counter()); // 1
    console.log(counter()); // 2
    ```

    Inner function "remembers" outer scope variables. I use closures for private variables, factory functions, and implementing modules.

    **Private variables with closures:**
    ```javascript
    function createBankAccount(initialBalance) {
      let balance = initialBalance;

      return {
        deposit: function(amount) {
          balance += amount;
          return balance;
        },
        withdraw: function(amount) {
          if (balance >= amount) {
            balance -= amount;
            return balance;
          }
          return 'Insufficient funds';
        },
        getBalance: function() {
          return balance;
        }
      };
    }

    const account = createBankAccount(1000);
    account.deposit(500); // 1500
    console.log(account.balance); // undefined - private!
    ```

    Closures are now my favorite tool.

    ## Higher-Order Functions - Functions as Parameters

    The concept that made me go "wow" the most: functions can take other functions as parameters.

    ```javascript
    function processArray(arr, callback) {
      const result = [];
      for (let item of arr) {
        result.push(callback(item));
      }
      return result;
    }

    const numbers = [1, 2, 3, 4, 5];
    const squared = processArray(numbers, x => x * x);
    console.log(squared); // [1, 4, 9, 16, 25]
    ```

    Array methods like map, filter, reduce are all higher-order functions. I use them every day.

    **Custom map function:**
    ```javascript
    function myMap(arr, mapper) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(mapper(arr[i], i, arr));
      }
      return result;
    }

    const doubled = myMap([1, 2, 3], x => x * 2);
    console.log(doubled); // [2, 4, 6]
    ```

    ## Function Composition - Combining Functions Together

    Advanced technique: combine multiple functions into a pipeline.

    ```javascript
    const compose = (...functions) => x =>
      functions.reduceRight((acc, fn) => fn(acc), x);

    const add = x => x + 1;
    const multiply = x => x * 2;
    const square = x => x * x;

    const complexCalc = compose(square, multiply, add);
    console.log(complexCalc(3)); // ((3 + 1) * 2)² = 64
    ```

    Function composition helps make code declarative and reusable.

    ## Immediately Invoked Function Expressions (IIFE)

    Old pattern but still useful: function that runs immediately after definition.

    ```javascript
    (function() {
      const privateVar = 'Secret';
      console.log('IIFE executed');
    })();

    // Arrow version
    (() => {
      console.log('Arrow IIFE');
    })();
    ```

    I use IIFE to create private scope, avoid global pollution.

    ## Callbacks, Promises, and Async Functions

    Modern JavaScript: async functions combined with callbacks and promises.

    ```javascript
    // Callback style
    function fetchUser(id, callback) {
      setTimeout(() => {
        callback({ id, name: 'User ' + id });
      }, 1000);
    }

    // Promise style
    function fetchUser(id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, name: 'User ' + id });
        }, 1000);
      });
    }

    // Async/await style
    async function getUserData() {
      try {
        const user = await fetchUser(1);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
    ```

    Async functions make async code look like sync code. Perfect!

    ## What I Learned After 2 Years of JavaScript Coding

    Functions are not just syntax - but a programming paradigm. From basic functions to advanced concepts like closures, higher-order functions - all change how I think about code.

    **Code reusability:** Functions help break down complex problems into smaller, manageable pieces.

    **Abstraction:** Hide implementation details, expose clean interfaces.

    **Composition:** Combine simple functions into complex behaviors.

    **Maintainability:** Well-structured functions are easy to test, debug, and maintain.

    JavaScript functions taught me: programming is not just solving problems, but solving them elegantly.

    If you're learning JavaScript, don't skip functions. Practice: write functions, refactor code into functions, experiment with closures. Functions will become your best friend.

    *P.S: Functions are the foundation of JavaScript. Master them, you can code anything!*
