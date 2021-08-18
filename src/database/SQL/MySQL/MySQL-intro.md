---
title: MySQL-intro
category: 数据库
tags:
  - mysql
---

> ​	![](https://img.shields.io/badge/MySQL-简介-blue.svg) 
>

<!-- more -->

## 一、概述

### （一）为什么学习数据库？

- 实现数据持久化
- 使用完整的管理系统统一管理，易于查询

### （二）数据库的相关概念

- DB：数据库（database）：存储数据的“仓库”。它保存了一系列有组织的数据。
- DBMS
  - 数据库管理系统（Database Management System）。数据库是通过DBMS创建和操作的容器
  - 常见的数据库管理系统：MySQL、Oracle、DB2、SqlServer等。
- SQL
  - 结构化查询语言（Structure Query Language）：专门用来与数据库通信的语言。
  - SQL的优点：①简单易学；②不是某个特定数据库供应商专有的语言，几乎所有DBMS都支持SQL；③虽然简单，但实际上是一种强有力的语言，灵活使用其语言元素，可以进行非常复杂和高级的数据库操作。
- DBA、DBS、DBMS、SQL、DB之间的关系

![关系](https://gitee.com/small-universe/blog_data/raw/images/%20database/MySQL/%E5%85%B3%E7%B3%BB.jpg)



### （三）数据库存储数据的特点

- 1、将数据放到表中，表再放到库中
- 2、一个数据库中可以有多个表，每个表都有一个的名字，用来标识自己。表名具有唯一性。
- 3、表具有一些特性，这些特性定义了数据在表中如何存储，类似java中 “类”的设计。
- 4、表由列组成，我们也称为字段。所有表都是由一个或多个列组成的，每一列类似java 中的”属性”。
- 5、表中的数据是按行存储的，每一行类似于java中的“对象”。



### （四）MySQL软件

- **介绍**

  - MySQL数据库原属于MySQLAB公司，总部位于瑞典，后被Oracle收购。

  - 优点：

    ①成本低：开放源代码，免费，可定制；

    ②简单：很容易安装和使用；

    ③性能高：轻巧、执行sql很快。

- **安装**

  - DBMS分为两类：

    ①基于共享文件系统的DBMS （Access）；

    ②基于客户机——服务器的DBMS（MySQL、Oracle、SqlServer）。

  - 版本可分为：社区版（免费），企业版（收费）。

  - Windows平台下下载社区版：http://dev.mysql.com/downloads/mysql

  - 下载后解压缩文件到指定文件夹并配置环境变量即可

    eg:  变量名`MySQL_HOME` 路径`D:\dev_softs\mysql-8.0.20-winx64`

- **启动和停止MySQL服务**

  - 方式一：右击此电脑—管理—服务—启动或停止MySQL服务

  - 方式二：DOS窗口中使用如下命令

    ```cmd
    启动：net start 服务名
    停止：net stop 服务名
    ```
  
- **MySQL服务端的登录和退出**

  ```sql
  登录
  mysql 【–h 主机名 -P 端口号】 –u 用户名 –p密码
  例：mysql -h localhost -u root -proot
  
  退出
  exit或ctrl+C
  ```

  

- **MySQL常见命令介绍**

  ```sql
  进入mysql, 在命令行中输入
  mysql–uroot–p####  (其中：####表示密码）
  例：mysql -uroot -proot
  
  查看mysql中有哪些个数据库
  show databases;
  
  新建一个数据库
  create database 数据库名;
  例：create database book;
  
  选择一个数据库
  use 数据库名称;
  例：use test;
  
  查询数据表
  show tables;
  
  查看指定的数据库中有哪些数据表
  show tables from 数据库名;
  例：show tables from mysql;
  
  查询当前所在数据库
  select database();
  
  新建一个数据表
  create table math(
      id int,
      name varchar(20)
  );
  
  查看表的结构
  desc 表名;
  例：desc math;
  
  查看表中的所有记录
  select * from 表名;
  例： select * from math;
  
  向表中插入记录
  insert into 表名(列名列表) values(列对应的值的列表);
  注意：插入varchar或date 型的数据要用单引号或双引号引起来
  例：insert into math (id,name) values(1,'ton');
  
  修改记录
  update 表名set 列1 = 列1的值, 列2 = 列2的值where ..
  例：update math set name="wugang" where id=1;
  
  删除记录
  delete from 表名 where ...
  例：delete from math where id=1;
  
  删除数据表
  drop table 表名;
  例：drop table math;
  ```

  

- **查看MySQL服务端版本**

  ```sql
  登录到mysql服务端
  SELECT VERSION() AS 'MySQL版本';
  
  没有登录到mysql服务端
  在cmd命令界面输入：mysql --version
  ```

  

- **MySQL的语法规范**

  - 不区分大小写,但建议关键字大写，表名、列名小写
  - 每句话用;或\g、\G结尾，最好用分号结尾
  - 每条命令根据需要，可以进行缩进或换行
  - 注释：①单行注释：#注释文字；②单行注释：-- 注释文字；③多行注释：/* 注释文字 */

- **图形化用户界面客户端**

  - 介绍：主要分为两种——SQLyog 12、Navicat 12 for mysql

  - 安装：傻瓜式安装

  - 卸载：方法一：控制面板选中SQLyog直接卸载；方法二：卸载时担心注册表清除不干净,百度geek下载工具，下载免费版即可。下载后，放到桌面，双击后可直接选中要卸载的软件进行卸载,最后可根据选择是否清除注册表。

  - 注意：`SQLyog连接数据库报错`plugin caching_sha2_password could not be loaded，解决方法如下

    ```cmd
    打开cmd：mysql -uroot -p 
    进入mysql依次执行下面语句
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; #修改加密规则 
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; #更新一下用户的密码 
    
    FLUSH PRIVILEGES; #刷新权限
    alter user 'root'@'localhost' identified by 'xzx123456';#重置密码，xzx123456就是变更后的密码，自己的密码自己更改下哦
    ```

  ::: tip 提示
  
  MySQL8.0+的驱动需要设置时区，如: 
  
  ```yml
  jdbc:mysql://localhost:3306/myemployees?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&useSSL=true
  ```
  
  ::: 
  
  
  
  
  
## 二、SQL语言的分类

::: info

对于这个，网上有三种、四种、五种、六种很多，但综合来说，是5种！！

因为大部分用到的是DQL和DML，偶尔会用到DDL，一般的开发人员很少会用到DCL

:::

- DQL（Data Query Language）：数据查询语言，用于检索数据库中的数据，主要是SELECT语句；
- DML（Data Manipulation Language)：数据操纵语言，用于改变数据库中的数据，主要包括INSERT、UPDATE和DELETE语句；
- DDL（Data Definition Language)：数据定义语言，用于库和表的创建、修改、删除。主要包括CREATE、DROP、ALTER语句；
- DCL（Data Control Language)：数据控制语言，用于定义用户的访问权限和安全级别。主要包括GRANT和REVOKE语句；
- TCL（Transaction Control Language)：事务控制语言，用于维护数据的一致性，包括COMMIT、ROLLBACK和SAVEPOINT语句。

