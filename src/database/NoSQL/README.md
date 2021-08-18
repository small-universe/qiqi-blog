---
title: 非关系型数据库
---

## 一、Redis

![image-20210316153254142](./assets/image-20210316153254142.png)

### （一）redis是什么?

- Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。
- 和Memcached类似，它支持存储的value类型相对更多，包括 ==string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）== 。
- redis的数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。
- 与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。

- redis的出现，很大程度补偿了memcached这类key/value存储的不足，在部分场合可以对关系数据库起到很好的补充作用。它提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等客户端，使用很方便。
- Redis支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得Redis可执行==单层树复制==。存盘可以有意无意的对数据进行写操作。由于完全实现了==发布/订阅机制==，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。同步对读取操作的可扩展性和数据冗余很有帮助。



### （二）redis性能

下面是官方的bench-mark数据：

测试完成了50个并发执行100000个请求。

设置和获取的值是一个256字节字符串。

Linux box是运行Linux 2.6,这是X3320 Xeon 2.5 ghz。

文本执行使用loopback接口(127.0.0.1)。

结果:读的速度是110000次/s,写的速度是81000次/s 。



### （三）redis存储

redis使用了两种文件格式：全量数据和增量请求。

**全量数据：**全量数据格式是把内存中的数据写入磁盘，便于下次读取文件进行加载；

**增量请求：**增量请求文件则是把内存中的数据序列化为操作请求，用于读取文件进行replay得到数据，序列化的操作包括SET、RPUSH、SADD、ZADD。



redis的存储分为三部分：

1. 内存存储
2. 磁盘存储
3. log文件

配置文件中有三个参数对其进行配置。

save seconds updates，save配置，指出在多长时间内，有多少次更新操作，就将数据同步到数据文件。这个可以多个条件配合，比如默认配置文件中的设置，就设置了三个条件。

appendonly yes/no ，appendonly配置，指出是否在每次更新操作后进行日志记录，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为redis本身同步数据文件是按上面的save条件来同步的，所以有的数据会在一段时间内只存在于内存中。

appendfsync no/always/everysec ，appendfsync配置，no表示等操作系统进行数据缓存同步到磁盘，always表示每次更新操作后手动调用fsync()将数据写到磁盘，everysec表示每秒同步一次。



### （四）附加资料

redis官网:http://redis.io/

redis官方文档:http://redis.io/documentation

redis教程:[http://www.w3cschool.cn/redis/redis-intro.html](https://www.w3cschool.cn/redis/redis-intro.html)

redis下载:http://redis.io/download
