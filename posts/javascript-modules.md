---

title: "JavaScript Network Error Handling và Best Practices"
date: "2024-05-05"
excerpt: "Tìm hiểu về xử lý lỗi trong network programming - các loại lỗi phổ biến, cách xử lý chúng, và best practices cho error handling trong JavaScript."
category: "JavaScript"
tags: ["JavaScript", "Error Handling", "Network Programming", "Best Practices", "Debugging"]
image: "/images/blog/module.png"
---

## Vấn đề khi network errors không được handle properly

Bạn đã bao giờ thấy app crash hoặc show cryptic error messages? Hay user complain "app không hoạt động" mà không biết tại sao?

Network programming đầy rủi ro: connections drop, servers down, invalid responses. Nếu không handle errors properly, user experience terrible, và debugging nightmare.

Trong production app đầu tiên, tôi chỉ log errors to console. Users thấy blank screens, file complaints. Sau khi implement proper error handling, user satisfaction tăng đáng kể.

## Phân loại network errors

Network errors chia thành categories khác nhau:

**Connection errors**: Không thể reach server (network down, DNS issues)
**HTTP errors**: Server trả error codes (404, 500, etc.)
**Timeout errors**: Request quá thời gian
**Data errors**: Response malformed hoặc unexpected

```javascript
async function robustFetch(url) {
  try {
    const response = await fetch(url, { timeout: 5000 });

    if (!response.ok) {
      // HTTP error
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - kiểm tra kết nối');
    } else if (error.message.includes('HTTP')) {
      throw error; // HTTP errors giữ nguyên
    } else {
      throw new Error('Network error - không thể kết nối server');
    }
  }
}
```

Handle từng loại error khác nhau, user biết exactly what happened.

### Các loại Network Errors

#### 1. Connection Errors

Lỗi khi không thể kết nối đến server:

Các loại errors phổ biến:

- **Connection errors**: Không thể reach server
- **HTTP errors**: Status codes 4xx/5xx  
- **Timeout errors**: Request quá thời gian
- **Parse errors**: Dữ liệu malformed

```javascript
async function robustFetch(url) {
  try {
    const response = await fetch(url, { timeout: 5000 });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Timeout');
    }
    throw new Error('Network error');
  }
}
```

### Error Handling Strategy

Tạo error handler tập trung để phân loại và xử lý errors consistently:

```javascript
class ErrorHandler {
  static handle(error) {
    if (error.name === 'TypeError') return { type: 'CONNECTION_ERROR', retryable: true };
    if (error.name === 'AbortError') return { type: 'TIMEOUT_ERROR', retryable: true };
    if (error.message.includes('HTTP')) return { type: 'HTTP_ERROR', retryable: error.status >= 500 };
    return { type: 'UNKNOWN_ERROR', retryable: true };
  }
}
```

### Retry Strategy

Combine retry với error handling cho robustness:

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### User-Friendly Messages

Show clear error messages to users instead of technical jargon.

### Logging và Monitoring

Log errors để debug và track issues:

```javascript
class ErrorLogger {
  static log(error, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: error.message,
      context
    };
    
    // Send to monitoring service
    fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(logEntry)
    });
  }
}
```

## Sau khi implement comprehensive error handling và giảm 80% user complaints về bugs

Sau khi deploy error handling system toàn diện với logging, monitoring, và user-friendly messages, tôi thấy user complaints giảm drasticaly.

Thứ nhất, user experience cải thiện rõ rệt. Thay vì blank screens và cryptic errors, users thấy clear messages: "Mất kết nối mạng, vui lòng thử lại" thay vì "TypeError: Failed to fetch".

Thứ hai, debugging trở nên dễ dàng. Với centralized logging và error tracking, tôi có thể identify patterns: "sáng thứ 2 có nhiều timeout errors" → "server overloaded on Monday mornings".

Thứ ba, system reliability tăng. Retry logic cho transient errors, graceful degradation khi services down. Users ít thấy app "broken" hơn.

Thứ tư, business metrics cải thiện. Error rate giảm từ 5% xuống 0.5%, user retention tăng 15%. Good error handling = better business.

## Kết luận: Error Handling - Silent guardian của network applications

Error handling không phải là "nice-to-have" - mà là "must-have" cho production applications. Khi master error handling, bạn không chỉ fix bugs mà còn prevent chúng.

Network programming dạy chúng ta: failures are inevitable, graceful handling is mandatory, user communication is key. Đây là foundation của reliable applications.

Nếu bạn thấy bài viết hữu ích, hãy share cho bạn bè cùng học nhé! Chúc bạn code vui vẻ và thành công với JavaScript error handling!

*P.S: Bài viết này kết thúc hoàn toàn series "JavaScript Network Programming". Hẹn gặp bạn ở series tiếp theo về React/Next.js và modern web development!*

