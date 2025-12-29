---

title:
  vi: "Đa tuyến và Xử lý đồng thời trong Java"
  en: "Multithreading and Concurrency in Java"
date: "2025-12-05"
excerpt:
  vi: "Tìm hiểu về Multithreading và Concurrency trong Java - cách tạo và quản lý threads, xử lý nhiều client đồng thời trong lập trình mạng."
  en: "Learn about Multithreading and Concurrency in Java - how to create and manage threads, handle multiple clients simultaneously in network programming."
category:
  vi: "Java"
  en: "Java"
tags: ["Java", "Multithreading", "Concurrency", "Threads", "ExecutorService"]
image: "/images/blog/multi.jpg"
content:
  vi: |
    ## Khi server của mình bị "đơ" vì quá tải

    Xin chào các bạn! Hôm nay mình muốn chia sẻ về hành trình học Multithreading trong Java. Đây là chủ đề mà lúc đầu mình thấy siêu khó hiểu, concurrency concepts phức tạp, race conditions, deadlocks - nghe đã muốn bỏ cuộc.

    Mình còn nhớ project đầu tiên: làm một simple chat server. Ban đầu dùng single thread, code đơn giản:

    ```java
    while (true) {
        Socket client = serverSocket.accept();
        handleClient(client); // Xử lý từng client một
    }
    ```

    Nhưng khi test với 2-3 clients cùng lúc, ôi trời ơi! Server bị "đơ" cứng. Client thứ 2 phải chờ client thứ 1 gõ xong, send xong mới được phục vụ. Với 10 clients? Server lag muốn chết.

    Mình ngồi debug cả đêm, rồi học được multithreading. Wow! Từ single thread handle 1 client, giờ server có thể xử lý 1000+ clients đồng thời. Sự khác biệt như từ xe đạp lên ô tô vậy.

    **Tại sao multithreading quan trọng trong network programming?**
    - Mỗi client cần thread riêng (network I/O thường block)
    - Server phải responsive, không được "đơ" vì 1 client chậm
    - Tận dụng multi-core CPU hiệu quả hơn

    Đó là lúc mình hiểu: multithreading không chỉ là "best practice" - mà là bắt buộc cho server applications.

    ## Học cách tạo thread - Từ confuse đến "aha!"

    Lúc đầu học multithreading, mình confuse với Thread class và Runnable interface. "Tại sao có 2 cách? Cách nào tốt hơn?"

    **Cách 1: Extend Thread class**
    Mình thử implement đầu tiên bằng cách extend Thread:

    ```java
    public class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Hello from thread: " + getName());
            // Xử lý logic ở đây
        }
    }

    // Sử dụng
    MyThread thread = new MyThread();
    thread.start();
    ```

    Nhưng rồi mình học được: Java không support multiple inheritance. Nếu class đã extend class khác thì sao? Đó là lúc mình biết đến Runnable.

    **Cách 2: Implement Runnable (mình dùng cách này)**
    ```java
    public class ClientHandler implements Runnable {
        @Override
        public void run() {
            System.out.println("Handling client in thread: " + Thread.currentThread().getName());
            // Xử lý client logic
        }
    }

    // Sử dụng
    Thread thread = new Thread(new ClientHandler());
    thread.start();
    ```

    Runnable flexible hơn vì có thể implement multiple interfaces. Bây giờ mình luôn dùng Runnable cho client handlers.

    **Lambda với Runnable (Java 8+)**
    Mình thích cách này nhất vì concise:

    ```java
    Thread thread = new Thread(() -> {
        System.out.println("Client handled by: " + Thread.currentThread().getName());
    });
    thread.start();
    ```

    Từ khi học được Runnable, multithreading code của mình clean hẳn ra.

    ### Thread là gì?

    Thread (luồng) là đơn vị nhỏ nhất của việc thực thi trong một chương trình. Một chương trình Java có thể có nhiều threads chạy đồng thời, cho phép thực hiện nhiều tác vụ cùng lúc.

    **Lợi ích của Multithreading:**
    - Tận dụng tối đa CPU (đặc biệt với multi-core processors)
    - Cải thiện responsiveness của ứng dụng
    - Xử lý nhiều client đồng thời trong network programming

    ### Tạo Thread - Các cách cơ bản

    #### Cách 1: Extend Thread class

    ```java
    public class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Thread đang chạy: " + Thread.currentThread().getName());
            for (int i = 0; i < 5; i++) {
                System.out.println("Count: " + i);
                try {
                    Thread.sleep(1000); // Ngủ 1 giây
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        public static void main(String[] args) {
            MyThread thread1 = new MyThread();
            MyThread thread2 = new MyThread();

            thread1.start(); // Bắt đầu thread
            thread2.start();
        }
    }
    ```

    #### Cách 2: Implement Runnable interface (Khuyến nghị)

    ```java
    public class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("Thread đang chạy: " + Thread.currentThread().getName());
        }

        public static void main(String[] args) {
            Thread thread1 = new Thread(new MyRunnable());
            Thread thread2 = new Thread(new MyRunnable());

            thread1.start();
            thread2.start();
        }
    }
    ```

    #### Cách 3: Lambda Expression (Java 8+)

    ```java
    public class LambdaThread {
        public static void main(String[] args) {
            Thread thread = new Thread(() -> {
                System.out.println("Thread chạy với lambda: " +
                    Thread.currentThread().getName());
            });
            thread.start();
        }
    }
    ```

    ### Thread Pool - Bài học về resource management

    Lúc đầu, mình tạo thread mới cho mỗi client. Với 100 clients? 100 threads! Mình thấy memory usage tăng vọt, CPU spike, rồi OutOfMemoryError.

    **Thread Pool - Lifesaver:**
    Mình học được ExecutorService - thread pool để tái sử dụng threads. Thay vì tạo/destroy threads liên tục, pool manage một số lượng threads cố định.

    ```java
    ExecutorService threadPool = Executors.newFixedThreadPool(10); // Max 10 threads

    for (int i = 0; i < 100; i++) {
        final int clientId = i;
        threadPool.submit(() -> {
            System.out.println("Handling client " + clientId +
                " on " + Thread.currentThread().getName());
            // Process client
        });
    }

    threadPool.shutdown(); // Đóng pool khi xong
    ```

    **Performance improvement:**
    - Trước: 100 threads → memory issues
    - Sau: 10 threads tái sử dụng → stable, efficient

    Mình đã tối ưu server từ crash với 50 clients lên handle 1000+ clients smoothly.

    **Network server với thread pool:**
    Trong server thực tế, mình dùng thread pool cho tất cả client connections. Mỗi client được xử lý trong thread riêng từ pool, server không bao giờ overload.

    ```java
    import java.net.ServerSocket;
    import java.net.Socket;
    import java.io.*;
    import java.util.concurrent.ExecutorService;
    import java.util.concurrent.Executors;

    public class MultiThreadedServer {
        private static final int PORT = 8080;
        private static final int MAX_THREADS = 10;
        private static ExecutorService threadPool =
            Executors.newFixedThreadPool(MAX_THREADS);

        public static void main(String[] args) {
            try (ServerSocket serverSocket = new ServerSocket(PORT)) {
                System.out.println("Server đang lắng nghe trên port " + PORT);

                while (true) {
                    Socket clientSocket = serverSocket.accept();
                    System.out.println("Client kết nối: " +
                        clientSocket.getInetAddress());

                    // Xử lý client trong thread pool
                    threadPool.submit(new ClientHandler(clientSocket));
                }
            } catch (IOException e) {
                System.err.println("Lỗi server: " + e.getMessage());
            } finally {
                threadPool.shutdown();
            }
        }

        // Inner class để xử lý từng client
        static class ClientHandler implements Runnable {
            private Socket clientSocket;

            public ClientHandler(Socket socket) {
                this.clientSocket = socket;
            }

            @Override
            public void run() {
                try (BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));
                     PrintWriter out = new PrintWriter(
                        clientSocket.getOutputStream(), true)) {

                    String inputLine;
                    while ((inputLine = in.readLine()) != null) {
                        System.out.println("Thread " + Thread.currentThread().getName() +
                            " nhận: " + inputLine);

                        // Xử lý message
                        String response = "Echo: " + inputLine;
                        out.println(response);

                        if ("quit".equalsIgnoreCase(inputLine)) {
                            break;
                        }
                    }
                } catch (IOException e) {
                    System.err.println("Lỗi xử lý client: " + e.getMessage());
                } finally {
                    try {
                        clientSocket.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
    ```

    ### Synchronization - Khi threads "đánh nhau" nhau

    Đây là phần khó nhất của multithreading. Mình đã debug race conditions cả tuần liền.

    **Race condition nightmare:**
    Mình có counter class, multiple threads increment cùng lúc. Kết quả? Final count sai hoàn toàn! Thread A đọc 5, thread B đọc 5, cả hai ghi 6. Thay vì 10, kết quả là 6.

    **Synchronized - Simple solution:**
    ```java
    public class Counter {
        private int count = 0;

        public synchronized void increment() {
            count++; // Chỉ 1 thread có thể execute cùng lúc
        }

        public synchronized int getCount() {
            return count;
        }
    }
    ```

    Nhưng synchronized có vấn đề: performance kém, dễ deadlock. Mình học được ReentrantLock - flexible hơn.

    ```java
    import java.util.concurrent.locks.ReentrantLock;

    public class SafeCounter {
        private int count = 0;
        private ReentrantLock lock = new ReentrantLock();

        public void increment() {
            lock.lock();
            try {
                count++;
            } finally {
                lock.unlock(); // Quan trọng: luôn unlock
            }
        }
    }
    ```

    **Deadlock horror story:**
    Mình từng tạo deadlock khi 2 threads chờ nhau. Thread A lock resource X, chờ Y; Thread B lock Y, chờ X. Kết quả: cả 2 treo forever.

    **Bài học:** Luôn acquire locks theo thứ tự nhất quán, avoid nested locks.

    **Concurrent Collections - Thread-safe data structures:**
    Java có ConcurrentHashMap, CopyOnWriteArrayList - thread-safe mà performance tốt. Mình dùng chúng thay vì synchronized collections.

    Từ khi học synchronization properly, multithreading bugs giảm hẳn. Nhưng vẫn cần cẩn thận - concurrency bugs khó debug lắm!

    ```java
    import java.util.concurrent.*;

    public class ConcurrentCollectionsExample {
        public static void main(String[] args) {
            // ConcurrentHashMap - thread-safe HashMap
            ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
            map.put("key1", 1);
            map.put("key2", 2);

            // BlockingQueue - thread-safe queue
            BlockingQueue<String> queue = new LinkedBlockingQueue<>();
            queue.offer("item1");
            queue.offer("item2");

            // CopyOnWriteArrayList - thread-safe ArrayList
            CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
            list.add("element1");
            list.add("element2");
        }
    }
    ```

    ### Future và Callable - Xử lý kết quả bất đồng bộ

    ```java
    import java.util.concurrent.*;

    public class FutureExample {
        public static void main(String[] args) {
            ExecutorService executor = Executors.newFixedThreadPool(3);

            // Submit Callable task
            Future<String> future = executor.submit(() -> {
                Thread.sleep(2000);
                return "Kết quả từ thread";
            });

            System.out.println("Đang chờ kết quả...");

            try {
                // Lấy kết quả (blocking)
                String result = future.get(5, TimeUnit.SECONDS);
                System.out.println("Kết quả: " + result);
            } catch (TimeoutException e) {
                System.out.println("Timeout!");
            } catch (Exception e) {
                e.printStackTrace();
            }

            executor.shutdown();
        }
    }
    ```

    ### CompletableFuture - Lập trình bất đồng bộ hiện đại

    ```java
    import java.util.concurrent.CompletableFuture;

    public class CompletableFutureExample {
        public static void main(String[] args) {
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return "Hello";
            });

            future.thenApply(s -> s + " World")
                  .thenAccept(System.out::println);

            // Chờ hoàn thành
            future.join();
        }
    }
    ```

    ## Những gì mình học được sau project multithreaded server

    Sau khi deploy server production và gặp đủ loại concurrency issues, mình rút ra nhiều bài học quý báu.

    **Thread pool - Prevent OutOfMemory:**
    Mình từng tạo thread mới cho mỗi client. Với 1000 clients? 1000 threads! Server crash ngay. Thread pool cứu cánh - giới hạn số threads, tái sử dụng efficiently.

    **Synchronization - Race conditions và deadlocks:**
    Mình debug race condition cả tuần. 2 threads modify shared data cùng lúc, kết quả unpredictable. Synchronization giúp, nhưng dễ tạo deadlock nếu không cẩn thận.

    **Monitoring - Know your threads:**
    Production server cần metrics: active threads, queue size, response time. Mình implement monitoring để detect issues early.

    **Performance vs Safety trade-off:**
    Synchronized methods safe nhưng slow. Concurrent collections fast hơn nhưng phức tạp hơn. Mình học được balance giữa 2 factors.

    ## Kết luận: Multithreading - Cầu nối từ single-threaded sang scalable systems

    Multithreading không chỉ là "chạy nhiều threads" - mà là cách scale applications để handle thousands of concurrent users. Từ single-threaded server chỉ handle 1 client, giờ mình có thể build systems phục vụ hàng triệu users.

    Concurrency dạy mình: shared state nguy hiểm, isolation quan trọng, monitoring bắt buộc. Đây là foundation của high-performance Java applications.

    Nếu bạn đang học Java và thấy multithreading confusing, đừng nản nhé! Mình cũng từng như bạn. Bắt đầu với simple Thread examples, rồi thread pools, synchronization. Practice nhiều, debug nhiều, bạn sẽ conquer được.

    *Lời khuyên cho sinh viên:*
    - Bắt đầu với basic Thread creation
    - Học thread pools trước khi synchronization
    - Debug race conditions bằng logging
    - Practice với concurrent collections

    *P.S: Đây là kinh nghiệm mình học được trong môn Java nâng cao. Nếu bạn thấy bài viết hữu ích, hãy share cho bạn bè cùng học nhé!*
  en: |
    ## When My Server Crashed Due to Overload

    Hello everyone! Today I want to share my journey learning Multithreading in Java. This is a topic that initially seemed extremely confusing to me - complex concurrency concepts, race conditions, deadlocks - just hearing about them made me want to give up.

    I still remember my first project: building a simple chat server. Initially using single thread, the code was simple:

    ```java
    while (true) {
        Socket client = serverSocket.accept();
        handleClient(client); // Handle each client one by one
    }
    ```

    But when testing with 2-3 clients at the same time, oh my god! The server completely froze. The second client had to wait for the first one to finish typing and sending before being served. With 10 clients? The server lagged terribly.

    I sat debugging all night, then learned about multithreading. Wow! From single thread handling 1 client, now the server could handle 1000+ clients simultaneously. The difference was like going from a bicycle to a car.

    **Why is multithreading important in network programming?**
    - Each client needs its own thread (network I/O is usually blocking)
    - Server must be responsive, not freeze due to one slow client
    - Better utilization of multi-core CPU

    That's when I understood: multithreading is not just a "best practice" - it's mandatory for server applications.

    ## Learning Thread Creation - From Confusion to "Aha!"

    When first learning multithreading, I was confused by Thread class and Runnable interface. "Why are there 2 ways? Which one is better?"

    **Method 1: Extend Thread class**
    I tried implementing by extending Thread first:

    ```java
    public class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Hello from thread: " + getName());
            // Process logic here
        }
    }

    // Usage
    MyThread thread = new MyThread();
    thread.start();
    ```

    But then I learned: Java doesn't support multiple inheritance. What if the class already extends another class? That's when I discovered Runnable.

    **Method 2: Implement Runnable (I use this one)**
    ```java
    public class ClientHandler implements Runnable {
        @Override
        public void run() {
            System.out.println("Handling client in thread: " + Thread.currentThread().getName());
            // Process client logic
        }
    }

    // Usage
    Thread thread = new Thread(new ClientHandler());
    thread.start();
    ```

    Runnable is more flexible because you can implement multiple interfaces. Now I always use Runnable for client handlers.

    **Lambda with Runnable (Java 8+)**
    I like this method the most because it's concise:

    ```java
    Thread thread = new Thread(() -> {
        System.out.println("Client handled by: " + Thread.currentThread().getName());
    });
    thread.start();
    ```

    Since learning Runnable, my multithreading code has become much cleaner.

    ### What is a Thread?

    A thread (thread) is the smallest unit of execution in a program. A Java program can have multiple threads running simultaneously, allowing multiple tasks to be performed at the same time.

    **Benefits of Multithreading:**
    - Maximum CPU utilization (especially with multi-core processors)
    - Improved application responsiveness
    - Handle multiple clients simultaneously in network programming

    ### Creating Threads - Basic Methods

    #### Method 1: Extend Thread class

    ```java
    public class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Thread is running: " + Thread.currentThread().getName());
            for (int i = 0; i < 5; i++) {
                System.out.println("Count: " + i);
                try {
                    Thread.sleep(1000); // Sleep 1 second
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        public static void main(String[] args) {
            MyThread thread1 = new MyThread();
            MyThread thread2 = new MyThread();

            thread1.start(); // Start thread
            thread2.start();
        }
    }
    ```

    #### Method 2: Implement Runnable interface (Recommended)

    ```java
    public class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("Thread is running: " + Thread.currentThread().getName());
        }

        public static void main(String[] args) {
            Thread thread1 = new Thread(new MyRunnable());
            Thread thread2 = new Thread(new MyRunnable());

            thread1.start();
            thread2.start();
        }
    }
    ```

    #### Method 3: Lambda Expression (Java 8+)

    ```java
    public class LambdaThread {
        public static void main(String[] args) {
            Thread thread = new Thread(() -> {
                System.out.println("Thread running with lambda: " +
                    Thread.currentThread().getName());
            });
            thread.start();
        }
    }
    ```

    ### Thread Pool - Resource Management Lesson

    Initially, I created a new thread for each client. With 100 clients? 100 threads! I saw memory usage spike, CPU spike, then OutOfMemoryError.

    **Thread Pool - Lifesaver:**
    I learned about ExecutorService - a thread pool for reusing threads. Instead of continuously creating/destroying threads, the pool manages a fixed number of threads.

    ```java
    ExecutorService threadPool = Executors.newFixedThreadPool(10); // Max 10 threads

    for (int i = 0; i < 100; i++) {
        final int clientId = i;
        threadPool.submit(() -> {
            System.out.println("Handling client " + clientId +
                " on " + Thread.currentThread().getName());
            // Process client
        });
    }

    threadPool.shutdown(); // Close pool when done
    ```

    **Performance improvement:**
    - Before: 100 threads → memory issues
    - After: 10 reusable threads → stable, efficient

    I optimized my server from crashing with 50 clients to smoothly handling 1000+ clients.

    **Network server with thread pool:**
    In real servers, I use thread pools for all client connections. Each client is handled in a separate thread from the pool, the server never overloads.

    ```java
    import java.net.ServerSocket;
    import java.net.Socket;
    import java.io.*;
    import java.util.concurrent.ExecutorService;
    import java.util.concurrent.Executors;

    public class MultiThreadedServer {
        private static final int PORT = 8080;
        private static final int MAX_THREADS = 10;
        private static ExecutorService threadPool =
            Executors.newFixedThreadPool(MAX_THREADS);

        public static void main(String[] args) {
            try (ServerSocket serverSocket = new ServerSocket(PORT)) {
                System.out.println("Server is listening on port " + PORT);

                while (true) {
                    Socket clientSocket = serverSocket.accept();
                    System.out.println("Client connected: " +
                        clientSocket.getInetAddress());

                    // Handle client in thread pool
                    threadPool.submit(new ClientHandler(clientSocket));
                }
            } catch (IOException e) {
                System.err.println("Server error: " + e.getMessage());
            } finally {
                threadPool.shutdown();
            }
        }

        // Inner class to handle each client
        static class ClientHandler implements Runnable {
            private Socket clientSocket;

            public ClientHandler(Socket socket) {
                this.clientSocket = socket;
            }

            @Override
            public void run() {
                try (BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));
                     PrintWriter out = new PrintWriter(
                        clientSocket.getOutputStream(), true)) {

                    String inputLine;
                    while ((inputLine = in.readLine()) != null) {
                        System.out.println("Thread " + Thread.currentThread().getName() +
                            " received: " + inputLine);

                        // Process message
                        String response = "Echo: " + inputLine;
                        out.println(response);

                        if ("quit".equalsIgnoreCase(inputLine)) {
                            break;
                        }
                    }
                } catch (IOException e) {
                    System.err.println("Error handling client: " + e.getMessage());
                } finally {
                    try {
                        clientSocket.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
    ```

    ### Synchronization - When Threads "Fight" Each Other

    This is the hardest part of multithreading. I debugged race conditions for an entire week.

    **Race condition nightmare:**
    I had a counter class, multiple threads incrementing at the same time. Result? The final count was completely wrong! Thread A reads 5, Thread B reads 5, both write 6. Instead of 10, the result was 6.

    **Synchronized - Simple solution:**
    ```java
    public class Counter {
        private int count = 0;

        public synchronized void increment() {
            count++; // Only 1 thread can execute at a time
        }

        public synchronized int getCount() {
            return count;
        }
    }
    ```

    But synchronized has problems: poor performance, easy deadlock. I learned about ReentrantLock - more flexible.

    ```java
    import java.util.concurrent.locks.ReentrantLock;

    public class SafeCounter {
        private int count = 0;
        private ReentrantLock lock = new ReentrantLock();

        public void increment() {
            lock.lock();
            try {
                count++;
            } finally {
                lock.unlock(); // Important: always unlock
            }
        }
    }
    ```

    **Deadlock horror story:**
    I once created a deadlock when 2 threads waited for each other. Thread A locks resource X, waits for Y; Thread B locks Y, waits for X. Result: both hang forever.

    **Lesson:** Always acquire locks in consistent order, avoid nested locks.

    **Concurrent Collections - Thread-safe data structures:**
    Java has ConcurrentHashMap, CopyOnWriteArrayList - thread-safe with good performance. I use them instead of synchronized collections.

    Since learning synchronization properly, multithreading bugs have decreased significantly. But still need to be careful - concurrency bugs are hard to debug!

    ```java
    import java.util.concurrent.*;

    public class ConcurrentCollectionsExample {
        public static void main(String[] args) {
            // ConcurrentHashMap - thread-safe HashMap
            ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
            map.put("key1", 1);
            map.put("key2", 2);

            // BlockingQueue - thread-safe queue
            BlockingQueue<String> queue = new LinkedBlockingQueue<>();
            queue.offer("item1");
            queue.offer("item2");

            // CopyOnWriteArrayList - thread-safe ArrayList
            CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
            list.add("element1");
            list.add("element2");
        }
    }
    ```

    ### Future and Callable - Handling Asynchronous Results

    ```java
    import java.util.concurrent.*;

    public class FutureExample {
        public static void main(String[] args) {
            ExecutorService executor = Executors.newFixedThreadPool(3);

            // Submit Callable task
            Future<String> future = executor.submit(() -> {
                Thread.sleep(2000);
                return "Result from thread";
            });

            System.out.println("Waiting for result...");

            try {
                // Get result (blocking)
                String result = future.get(5, TimeUnit.SECONDS);
                System.out.println("Result: " + result);
            } catch (TimeoutException e) {
                System.out.println("Timeout!");
            } catch (Exception e) {
                e.printStackTrace();
            }

            executor.shutdown();
        }
    }
    ```

    ### CompletableFuture - Modern Asynchronous Programming

    ```java
    import java.util.concurrent.CompletableFuture;

    public class CompletableFutureExample {
        public static void main(String[] args) {
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return "Hello";
            });

            future.thenApply(s -> s + " World")
                  .thenAccept(System.out::println);

            // Wait for completion
            future.join();
        }
    }
    ```

    ## What I Learned After the Multithreaded Server Project

    After deploying to production and encountering all kinds of concurrency issues, I drew many valuable lessons.

    **Thread pool - Prevent OutOfMemory:**
    I used to create a new thread for each client. With 1000 clients? 1000 threads! Server crashed immediately. Thread pool to the rescue - limits threads, reuses efficiently.

    **Synchronization - Race conditions and deadlocks:**
    I debugged race conditions for a week. 2 threads modifying shared data at the same time, unpredictable results. Synchronization helps, but easy to create deadlocks if not careful.

    **Monitoring - Know your threads:**
    Production servers need metrics: active threads, queue size, response time. I implemented monitoring to detect issues early.

    **Performance vs Safety trade-off:**
    Synchronized methods are safe but slow. Concurrent collections are faster but more complex. I learned to balance between the two factors.

    ## Conclusion: Multithreading - Bridge from Single-threaded to Scalable Systems

    Multithreading is not just "running multiple threads" - but a way to scale applications to handle thousands of concurrent users. From single-threaded server handling only 1 client, now I can build systems serving millions of users.

    Concurrency taught me: shared state is dangerous, isolation is important, monitoring is mandatory. This is the foundation of high-performance Java applications.

    If you're learning Java and find multithreading confusing, don't give up! I was like you too. Start with simple Thread examples, then thread pools, synchronization. Practice a lot, debug a lot, you will conquer it.

    *Advice for students:*
    - Start with basic Thread creation
    - Learn thread pools before synchronization
    - Debug race conditions with logging
    - Practice with concurrent collections

    *P.S: This is the experience I gained in the Advanced Java course. If you find this article helpful, please share it with your classmates!*