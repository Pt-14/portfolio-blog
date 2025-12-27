---

title: "Quản lý địa chỉ kết nối mạng trong Java"
date: "2024-03-20"
excerpt: "Tìm hiểu về InetAddress, URL, URI và cách quản lý địa chỉ kết nối mạng trong Java - nền tảng cho lập trình mạng."
category: "Java"
tags: ["Java", "Networking", "InetAddress", "URL", "Network Address"]
image: "/images/blog/javanet.jpg"
---

## Khi mình "đấu tranh" với địa chỉ mạng trong Java

Xin chào các bạn! Hôm nay mình muốn chia sẻ về hành trình học Network Addresses trong Java. Đây là chủ đề mà lúc đầu mình thấy boring nhất - "địa chỉ IP, hostname, URL gì mà khó thế?"

Nhưng khi làm network programming thực tế, mình mới vỡ lẽ tầm quan trọng. Client connect đến server bằng IP hay hostname? URL validation? DNS lookup? - tất cả đều cần handle properly.

Mình còn nhớ project đầu tiên: simple client-server app. Mình hardcode IP address, nghĩ vậy là đủ. Nhưng khi deploy, ôi trời ơi:

- Localhost work, nhưng trên server thì không
- DNS resolution fail
- Invalid URLs crash app
- IPv4/IPv6 compatibility issues

Đó là lúc mình học được InetAddress, URL, URI classes. Từ confuse với network addresses, giờ mình có thể handle chúng proficiently.

Bài viết này là những gì mình học được sau 2 tháng vật lộn với network addresses trong Java.

## InetAddress - Khi mình học cách "dịch" hostname thành IP

Lúc đầu, mình confuse với khái niệm hostname vs IP address. "google.com là hostname, 8.8.8.8 là IP" - OK, nhưng làm thế nào để Java convert giữa 2 thứ này?

**DNS Lookup cơ bản:**
Mình bắt đầu với code đơn giản nhất:

```java
import java.net.InetAddress;

public class DnsLookup {
    public static void main(String[] args) {
        try {
            InetAddress address = InetAddress.getByName("google.com");
            System.out.println("IP của google.com: " + address.getHostAddress());
            System.out.println("Hostname: " + address.getHostName());
        } catch (Exception e) {
            System.err.println("DNS lookup failed: " + e.getMessage());
        }
    }
}
```

Wow! Chỉ 1 dòng code `getByName()` là có thể resolve hostname thành IP. Mình đã thử với nhiều domains: localhost, google.com, github.com - tất cả work.

**Reverse DNS lookup:**
Mình cũng thử ngược lại - từ IP ra hostname:

```java
InetAddress address = InetAddress.getByName("8.8.8.8");
System.out.println("Hostname của 8.8.8.8: " + address.getHostName());
```

Kết quả: "dns.google" - interesting!

**So với system commands:**
Trước khi học Java, mình dùng `nslookup` command. Nhưng Java có lợi thế:
- Cross-platform (Windows/Linux/macOS)
- Exception handling tốt
- Integrate mượt với Java code
- No need parse command output

Trong monitoring app của mình, InetAddress thay thế hoàn toàn ping commands. Reliable hơn và easy to automate.

### Những gì mình khám phá thêm về InetAddress

**Multiple IP addresses:**
Một hostname có thể có nhiều IP addresses (load balancing, redundancy). Mình học được `getAllByName()`:

```java
InetAddress[] addresses = InetAddress.getAllByName("google.com");
System.out.println("Google có " + addresses.length + " IP addresses:");
for (InetAddress addr : addresses) {
    System.out.println("  - " + addr.getHostAddress());
}
```

Kết quả: google.com có 4-6 IP addresses khác nhau! Mình hiểu được cách CDN và load balancing work.

**Connectivity check:**
Java có built-in ping functionality:

```java
boolean reachable = address.isReachable(5000); // Timeout 5 giây
if (reachable) {
    System.out.println("Server online!");
} else {
    System.out.println("Server offline hoặc network issues");
}
```

Trong monitoring app, mình dùng method này để check server health thay vì external ping tools.

### URL - Khi mình học cách parse web addresses

URL parsing lúc đầu làm mình đau đầu. "https://user:pass@host:port/path?query=value#fragment" - quá nhiều components!

Java URL class giúp parse dễ dàng:

```java
import java.net.URL;

URL url = new URL("https://www.example.com:8080/path?param=value#section");

System.out.println("Protocol: " + url.getProtocol());    // https
System.out.println("Host: " + url.getHost());            // www.example.com  
System.out.println("Port: " + url.getPort());            // 8080
System.out.println("Path: " + url.getPath());            // /path
System.out.println("Query: " + url.getQuery());          // param=value
System.out.println("Fragment: " + url.getRef());         // section
```

Wow! Từ một string phức tạp, giờ mình có thể extract từng phần riêng biệt. Validation URLs, build dynamic URLs - tất cả trở nên simple.

#### Tạo và phân tích URL

```java
import java.net.URL;
import java.net.MalformedURLException;

public class URLExample {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://www.example.com:8080/path/to/resource?param=value#fragment");
            
            System.out.println("Protocol: " + url.getProtocol());
            System.out.println("Host: " + url.getHost());
            System.out.println("Port: " + url.getPort());
            System.out.println("Default Port: " + url.getDefaultPort());
            System.out.println("Path: " + url.getPath());
            System.out.println("Query: " + url.getQuery());
            System.out.println("Fragment: " + url.getRef());
            System.out.println("Full URL: " + url.toString());
        } catch (MalformedURLException e) {
            System.err.println("URL không hợp lệ: " + e.getMessage());
        }
    }
}
```

### URI vs URL - Sự khác biệt làm mình confuse

Lúc đầu, mình không phân biệt được URI và URL. Giáo viên giảng "URI là Uniform Resource Identifier, URL là Uniform Resource Locator" - mình gật gù nhưng không hiểu.

**URI - Broad concept:**
URI là định danh tài nguyên, có thể là:
- URL: https://example.com (có thể truy cập)
- URN: urn:isbn:1234567890 (chỉ định danh, không truy cập được)

Java URI class flexible hơn URL:

```java
URI uri = new URI("https://example.com/path?query=value#fragment");
System.out.println("Scheme: " + uri.getScheme());      // https
System.out.println("Authority: " + uri.getAuthority()); // example.com
System.out.println("Path: " + uri.getPath());          // /path
```

**URL vs URI trong practice:**
Mình dùng URL khi cần network operations (openStream, openConnection), URI khi chỉ cần manipulate strings.

**Real-world application:**
Mình build website availability checker:

```java
public static boolean isWebsiteUp(String urlString) {
    try {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("HEAD");
        conn.setConnectTimeout(5000);
        int responseCode = conn.getResponseCode();
        return responseCode >= 200 && responseCode < 400;
    } catch (IOException e) {
        return false;
    }
}
```

Trong monitoring system, method này giúp check health của multiple services automatically.

## Những bài học mình rút ra sau project networking

Sau 2 tháng làm việc với network addresses, mình học được nhiều điều không chỉ về code, mà về real-world networking.

**DNS reliability - Không bao giờ trust hoàn toàn:**
DNS có thể fail, timeout, return wrong results. Mình implement caching và fallback mechanisms. Production apps cần handle DNS failures gracefully.

**IPv4 vs IPv6 - Compatibility nightmare:**
Java handle cả hai, nhưng logging và storage có thể issues. Mình dùng string representation thay vì binary để avoid compatibility problems.

**Network unreliability - Expect failures:**
Mình từng có app crash vì DNS lookup fail. Bây giờ mọi network operation đều có timeout và error handling. Network world unreliable - code phải resilient.

**Performance considerations:**
DNS lookup có thể slow (100-500ms). Mình cache results, use connection pooling. Small optimizations impact user experience lớn.

## Kết luận: Network addresses - Gateway to network programming

Network addresses có vẻ boring lúc đầu, nhưng chúng là foundation của mọi network communication. Từ simple DNS lookup đến complex URL parsing - tất cả đều cần handle properly.

Trong hành trình học Java networking, network addresses dạy mình: network world fragile, validation crucial, error handling mandatory. Đây là mindset quan trọng cho mọi network developer.

Nếu bạn đang học Java networking và thấy network addresses confusing, đừng nản nhé! Mình cũng từng như bạn. Bắt đầu với simple DNS lookup, rồi URL parsing, network monitoring. Practice với real websites, handle edge cases.

*Lời khuyên cho sinh viên:*
- Test với real hostnames (google.com, github.com)
- Implement timeout cho mọi network operations
- Handle DNS failures gracefully
- Learn IPv4/IPv6 differences

*P.S: Đây là kinh nghiệm mình học được trong môn Java networking. Nếu bạn thấy bài viết hữu ích, hãy share cho bạn bè cùng học nhé!*
