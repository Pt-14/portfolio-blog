---

title: "JavaScript Async Network Operations"
date: "2024-04-20"
excerpt: "Tìm hiểu về xử lý bất đồng bộ trong network programming với async/await, Promises, và các kỹ thuật xử lý nhiều network operations đồng thời."
category: "JavaScript"
tags: ["JavaScript", "Async", "Await", "Promises", "Network Programming"]
image: "/images/blog/promise.png"
---

## Vấn đề callback hell trong network programming

Bạn đã bao giờ thấy code JavaScript với vô số nested callbacks? Đó là callback hell - khi network operations tạo thành một kim tự tháp khó maintain.

```javascript
// Callback hell - khó đọc, khó debug
fetch('/api/user', (user) => {
  fetch(`/api/posts/${user.id}`, (posts) => {
    fetch(`/api/comments/${posts[0].id}`, (comments) => {
      // Còn nữa...
    });
  });
});
```

JavaScript evolution từ callbacks → Promises → async/await để giải quyết vấn đề này. Async programming giờ trở nên tự nhiên và dễ hiểu.

## Promises - Khi mình bắt đầu học async

Lúc đầu học JavaScript, mình nghe khái niệm Promise mà confuse lắm. "Promise là cái gì? Tại sao lại có pending, fulfilled, rejected?" Mình đã dành cả buổi tối để đọc docs về Promise, nhưng vẫn mò mẫm.

Rồi mình hiểu ra: Promise là một "lời hứa" - bạn request cái gì đó, và Promise hứa sẽ trả về kết quả trong tương lai. Với network requests, fetch() trả về Promise ngay lập tức, nhưng data thì chưa có.

Mình nhớ lần đầu tiên dùng Promise thành công. Thay vì callback hell, mình có thể chain các .then() lại với nhau. Đơn giản hơn nhiều!

```javascript
// Promise đầu tiên của mình
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    console.log('Được rồi! User:', user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts cũng có rồi:', posts);
  })
  .catch(error => {
    console.error('Ối, lỗi rồi:', error);
  });
```

### Async/Await - "Aha moment" của mình

Rồi một ngày, mình học được async/await. Wow! Code bất đồng bộ giờ trông giống synchronous code hẳn. Mình đã refactor toàn bộ project cá nhân từ Promise chains sang async/await.

Điều làm mình ấn tượng nhất là error handling. Try/catch blocks giờ hoạt động bình thường với async code. Không còn .catch() chains phức tạp nữa.

```javascript
async function layDuLieu() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Dữ liệu đây:', data);
    return data;
  } catch (error) {
    console.error('Lỗi rồi bạn ơi:', error);
    throw error;
  }
}
```

Mình đã dành 2 tuần để chuyển đổi toàn bộ codebase. Ban đầu confusing lắm, nhưng giờ nhìn lại, code clean hẳn ra!

### Xử lý nhiều requests - Bài toán khó nhất của mình

Lúc đầu, mình nghĩ fetch một API là đủ rồi. Nhưng khi làm project thực tế, mình cần fetch nhiều APIs cùng lúc. Đó là lúc mình học được Promise.all.

**Promise.all - Chờ tất cả hoàn thành**
Mình có app cần load 5 users cùng lúc. Thay vì fetch tuần tự (chậm), mình dùng Promise.all để fetch song song. Performance tăng vọt!

```javascript
async function layNhieuUsers(userIds) {
  try {
    const promises = userIds.map(id =>
      fetch(`https://api.example.com/users/${id}`)
        .then(res => res.json())
    );

    const users = await Promise.all(promises);
    console.log('Tất cả users:', users);
    return users;
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}
```

**Promise.race - Timeout cho requests**
Network không đáng tin cậy. Mình đã từng có request treo cả phút. Promise.race cứu cánh đấy!

```javascript
async function fetchVoiTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), timeout)
  );

  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return await response.json();
  } catch (error) {
    console.log('Request timeout hoặc lỗi:', error.message);
  }
}
```

Mình đã áp dụng timeout cho tất cả API calls sau bài học đắt giá đó.

### Retry logic - Khi network "làm biếng"

Network programming dạy mình rằng: thất bại là bình thường. Server có thể down, connection có thể đứt. Mình đã có project fail vì không handle retry properly.

**Bài học từ kinh nghiệm:**
Mình đã implement retry với exponential backoff. Lần đầu fail, thử lại sau 1s. Lần thứ 2 fail, thử lại sau 2s. Lần thứ 3 fail, thử lại sau 4s. Thông minh đúng không?

```javascript
async function fetchVoiRetry(url, maxRetries = 3) {
  let delay = 1000;

  for (let lanThu = 0; lanThu < maxRetries; lanThu++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (lanThu === maxRetries - 1) {
        throw error; // Đã thử hết rồi
      }
      console.log(`Lần ${lanThu + 1} fail, thử lại sau ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Tăng delay
    }
  }
}
```

### Sequential vs Parallel - Performance matters

Lúc đầu, mình viết code tuần tự (sequential) vì dễ hiểu. Nhưng khi có 10 requests, mất 10 giây thay vì 1 giây. Đó là lúc mình học parallel processing.

**Sequential (chậm):**
```javascript
async function layTuTu(userIds) {
  const users = [];
  for (const id of userIds) {
    const response = await fetch(`https://api.example.com/users/${id}`);
    const user = await response.json();
    users.push(user);
  }
  return users;
}
```

**Parallel (nhanh):**
```javascript
async function laySongSong(userIds) {
  const promises = userIds.map(id =>
    fetch(`https://api.example.com/users/${id}`)
      .then(res => res.json())
  );
  return await Promise.all(promises);
}
```

Mình đã tối ưu performance project của mình từ 8 giây xuống 2 giây chỉ bằng cách này!

### Error handling - Bài học đắt giá

Lúc đầu, mình nghĩ error handling là optional. "Code chạy được là được rồi!" Nhưng production dạy mình bài học đắt giá.

Mình đã có lần app crash vì không handle network errors properly. Users thấy white screen, support tickets đổ về như mưa. Từ đó, mình implement comprehensive error handling.

**Global error handler:**
Mình tạo một wrapper cho tất cả fetch calls. Log error, show user-friendly message, và report to monitoring service.

**Cancellation - Khi user không chờ nữa:**
Trong app chat của mình, khi user chuyển trang, mình cần cancel pending requests. AbortController cứu cánh đấy!

```javascript
class FetchCoTheHuy {
  constructor(url) {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.promise = fetch(url, { signal: this.signal });
  }

  cancel() {
    this.controller.abort();
  }

  async get() {
    try {
      const response = await this.promise;
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('User đã cancel request');
        return null;
      }
      throw error;
    }
  }
}
```

Mình đã prevent nhiều memory leaks nhờ cancellation pattern này.

## Những gì mình học được sau nhiều tháng vật lộn với async

Sau khi hoàn thành môn JavaScript nâng cao, mình có thể tự tin nói: async programming đã thay đổi cách mình code forever.

**Thứ nhất: Từ confuse đến master**
Lúc đầu, Promise, async/await làm mình đau đầu. Nhưng khi hiểu được, mọi thứ trở nên logical. Mình có thể handle complex async flows dễ dàng.

**Thứ hai: Performance optimization thực tế**
Mình đã tối ưu project từ 8 giây load time xuống 2 giây chỉ bằng Promise.all. Đó là khoảnh khắc "wow" khi thấy code thực sự matters.

**Thứ ba: Error handling is everything**
Network unreliable lắm. Retry logic, timeout, cancellation - những concepts này giờ thành reflex của mình.

**Thứ tư: Code quality improvement**
Async/await làm code readable hơn hẳn. Teammates có thể hiểu và maintain dễ dàng. Testing cũng đơn giản hơn nhiều.

## Kết luận: Async programming - Journey của một sinh viên

Async/await không chỉ là syntax - mà là mindset shift. Từ việc sợ asynchronous code, giờ mình có thể build scalable network applications.

Nếu bạn đang học JavaScript và thấy async confusing, đừng nản nhé! Mình cũng từng như bạn. Hãy bắt đầu với simple Promise, rồi dần dần lên async/await. Practice nhiều, debug nhiều, và bạn sẽ conquer được.

**Lời khuyên cho sinh viên:**
- Bắt đầu với Promise chains trước khi nhảy vào async/await
- Practice với nhiều network requests để hiểu performance
- Implement error handling từ early stage
- Đừng ngại refactor - từ callbacks sang async/await đáng effort lắm

Nếu bài này giúp ích được gì, hãy share cho bạn bè cùng lớp nhé! Async programming khó nhưng khi conquer được, bạn sẽ thấy nó amazing lắm.

*P.S: Đây là kinh nghiệm học tập của mình. Nếu bạn thấy bài viết hữu ích, hãy share cho bạn bè cùng học nhé!*

