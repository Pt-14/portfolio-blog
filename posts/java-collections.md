---

title:
  vi: "Quản lý địa chỉ kết nối mạng trong Java"
  en: "Network Address Management in Java"
date: "2025-11-28"
excerpt:
  vi: "Tìm hiểu về InetAddress, URL, URI và cách quản lý địa chỉ kết nối mạng trong Java - nền tảng cho lập trình mạng."
  en: "Learn about InetAddress, URL, URI and how to manage network connection addresses in Java - the foundation for network programming."
content:
  vi: |
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
  en: |
    ## When I "Struggled" with Network Addresses in Java

    Hello everyone! Today I want to share my journey learning Network Addresses in Java. This was the topic I found most boring at first - "IP addresses, hostnames, URLs, what's so difficult about them?"

    But when doing real network programming, I realized their importance. Should clients connect to servers using IP or hostname? URL validation? DNS lookup? - all need to be handled properly.

    I remember my first project: a simple client-server app. I hardcoded IP addresses, thinking that was enough. But when deploying, oh my goodness:

    - Localhost worked, but not on the server
    - DNS resolution failed
    - Invalid URLs crashed the app
    - IPv4/IPv6 compatibility issues

    That's when I learned about InetAddress, URL, URI classes. From being confused about network addresses, now I can handle them proficiently.

    This article shares what I learned after 2 months struggling with network addresses in Java.

    ## InetAddress - When I Learned to "Translate" Hostname to IP

    At first, I was confused about the concept of hostname vs IP address. "google.com is hostname, 8.8.8.8 is IP" - OK, but how does Java convert between these two?

    **Basic DNS Lookup:**
    I started with the simplest code:

    ```java
    import java.net.InetAddress;

    public class DnsLookup {
        public static void main(String[] args) {
            try {
                InetAddress address = InetAddress.getByName("google.com");
                System.out.println("IP of google.com: " + address.getHostAddress());
                System.out.println("Hostname: " + address.getHostName());
            } catch (Exception e) {
                System.err.println("DNS lookup failed: " + e.getMessage());
            }
        }
    }
    ```

    Wow! Just 1 line of code `getByName()` can resolve hostname to IP. I tried with many domains: localhost, google.com, github.com - all worked.

    **Reverse DNS lookup:**
    I also tried the reverse - from IP to hostname:

    ```java
    InetAddress address = InetAddress.getByName("8.8.8.8");
    System.out.println("Hostname of 8.8.8.8: " + address.getHostName());
    ```

    Result: "dns.google" - interesting!

    **Compared to system commands:**
    Before learning Java, I used `nslookup` command. But Java has advantages:
    - Cross-platform (Windows/Linux/macOS)
    - Good exception handling
    - Smooth integration with Java code
    - No need to parse command output

    In my monitoring app, InetAddress completely replaced ping commands. More reliable and easy to automate.

    ### What I discovered more about InetAddress

    **Multiple IP addresses:**
    One hostname can have multiple IP addresses (load balancing, redundancy). I learned `getAllByName()`:

    ```java
    InetAddress[] addresses = InetAddress.getAllByName("google.com");
    System.out.println("Google has " + addresses.length + " IP addresses:");
    for (InetAddress addr : addresses) {
        System.out.println("  - " + addr.getHostAddress());
    }
    ```

    Result: google.com has 4-6 different IP addresses! I understood how CDN and load balancing work.

    **Connectivity check:**
    Java has built-in ping functionality:

    ```java
    boolean reachable = address.isReachable(5000); // 5-second timeout
    if (reachable) {
        System.out.println("Server online!");
    } else {
        System.out.println("Server offline or network issues");
    }
    ```

    In my monitoring app, I use this method to check server health instead of external ping tools.

    ### URL - When I learned to parse web addresses

    URL parsing gave me headaches at first. "https://user:pass@host:port/path?query=value#fragment" - too many components!

    Java URL class makes parsing easy:

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

    Wow! From a complex string, now I can extract each part separately. URL validation, building dynamic URLs - everything became simple.

    #### Creating and parsing URLs

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
                System.err.println("Invalid URL: " + e.getMessage());
            }
        }
    }
    ```

    ### URI vs URL - The difference that confused me

    At first, I couldn't distinguish between URI and URL. The teacher lectured "URI is Uniform Resource Identifier, URL is Uniform Resource Locator" - I nodded but didn't understand.

    **URI - Broad concept:**
    URI is a resource identifier, can be:
    - URL: https://example.com (accessible)
    - URN: urn:isbn:1234567890 (just identifier, not accessible)

    Java URI class is more flexible than URL:

    ```java
    URI uri = new URI("https://example.com/path?query=value#fragment");
    System.out.println("Scheme: " + uri.getScheme());      // https
    System.out.println("Authority: " + uri.getAuthority()); // example.com
    System.out.println("Path: " + uri.getPath());          // /path
    ```

    **URL vs URI in practice:**
    I use URL when I need network operations (openStream, openConnection), URI when I just need to manipulate strings.

    **Real-world application:**
    I built a website availability checker:

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

    In my monitoring system, this method helps automatically check the health of multiple services.

    ## Lessons Learned from Networking Project

    After 2 months working with network addresses, I learned many things not just about code, but about real-world networking.

    **DNS reliability - Never trust completely:**
    DNS can fail, timeout, return wrong results. I implement caching and fallback mechanisms. Production apps need to handle DNS failures gracefully.

    **IPv4 vs IPv6 - Compatibility nightmare:**
    Java handles both, but logging and storage can have issues. I use string representation instead of binary to avoid compatibility problems.

    **Network unreliability - Expect failures:**
    I once had an app crash because DNS lookup failed. Now every network operation has timeout and error handling. Network world is unreliable - code must be resilient.

    **Performance considerations:**
    DNS lookup can be slow (100-500ms). I cache results, use connection pooling. Small optimizations greatly impact user experience.

    ## Conclusion: Network addresses - Gateway to network programming

    Network addresses seem boring at first, but they are the foundation of all network communication. From simple DNS lookup to complex URL parsing - everything needs to be handled properly.

    In my journey learning Java networking, network addresses taught me: network world is fragile, validation is crucial, error handling is mandatory. This is an important mindset for every network developer.

    If you're learning Java networking and find network addresses confusing, don't give up! I was just like you. Start with simple DNS lookup, then URL parsing, network monitoring. Practice with real websites, handle edge cases.

    *Advice for students:*
    - Test with real hostnames (google.com, github.com)
    - Implement timeout for all network operations
    - Handle DNS failures gracefully
    - Learn IPv4/IPv6 differences

    *P.S: This is the experience I gained in my Java networking course. If you found this article helpful, please share it with your fellow learners!*
category:
  vi: "Java"
  en: "Java"
tags: ["Java", "Networking", "InetAddress", "URL", "Network Address"]
image: "/images/blog/javanet.jpg"
---
