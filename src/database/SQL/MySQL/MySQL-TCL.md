---
title: MySQL-TCL
category: 数据库
tags:
 - mysql
---

>  ![](https://img.shields.io/badge/TCL-Transaction_Control_Language-blue.svg) 

<!-- more -->

<h2 style="color:#ab4642" align="center">TCL语言</h2>

## 一、什么是事务

一个或一组sql语句组成一个执行单元，这个执行单元要么全部执行，要么全部不执行。

```sql
案例：转账

张三丰  1000
郭襄	1000

update 表 set 张三丰的余额=500 where name='张三丰'
意外
update 表 set 郭襄的余额=1500 where name='郭襄'
```



## 二、事务的特性(ACID)

- 原子性：一个事务不可再分割，要么都执行要么都不执行
- 一致性：一个事务执行会使数据从一个一致状态切换到另外一个一致状态
- 隔离性：一个事务的执行不受其他事务的干扰
- 持久性：一个事务一旦提交，则会永久的改变数据库的数据.



## 三、事务的使用步骤 ★

- 了解

  （1）隐式（自动）事务：没有明显的开启和结束，本身就是一条事务可以自动提交，比如insert、update、delete

  （2）显式事务：事务具有明显的开启和结束的标记；前提：必须先设置自动提交功能为禁用

  ​          具体步骤

  ```sql
  ①开启事务
  set autocommit=0;
  start transaction;#可以省略
  
  ②编写一组逻辑sql语句
  注意：sql语句支持的是insert、update、delete
  
  设置回滚点：
  savepoint 回滚点名;
  
  ③结束事务
  提交：commit;
  回滚：rollback;
  回滚到指定的地方：rollback to 回滚点名;
  ```

- 案例

  ```mysql
  SHOW VARIABLES LIKE 'autocommit';
  SHOW ENGINES;
  
  #1.演示事务的使用步骤
  DROP TABLE IF EXISTS account;
  CREATE TABLE account(
  	id INT PRIMARY KEY AUTO_INCREMENT,
  	username VARCHAR(20),
  	balance DOUBLE
  );
  INSERT INTO account(username,balance)
  VALUES('张无忌',1000),('赵敏',1000);
  
  #开启事务
  SET autocommit=0;
  START TRANSACTION;
  #编写一组事务的语句
  UPDATE account SET balance = 1000 WHERE username='张无忌';
  UPDATE account SET balance = 1000 WHERE username='赵敏';
  
  #结束事务
  ROLLBACK;
  #commit;
  
  SELECT * FROM account;
  ```

  

## 四、并发事务

1、**事务的并发问题是如何发生的？**

- 多个事务同时操作 同一个数据库的相同数据时

2、**并发问题都有哪些？**

- 对于同时运行的多个事务, 当这些事务访问数据库中相同的数据时, 如果没有采取必要的隔离机制, 就会导致各种并发问题：
- 脏读：一个事务读取了其他事务还没有提交的数据，读到的是其他事务“更新”的数据；
- 不可重复读：一个事务多次读取，结果不一样；
- 幻读：一个事务读取了其他事务还没有提交的数据，只是读到的是 其他事务“插入”的数据。

- 数据库事务的隔离性: 数据库系统必须具有隔离并发运行各个事务的能力, 使它们不会相互影响, 避免各种并发问题.

- 一个事务与其他事务隔离的程度称为隔离级别. 数据库规定了多种事务隔离级别, 不同隔离级别对应不同的干扰程度, 隔离级别越高, 数据一致性就越好, 但并发性越弱

- 3、如何解决并发问题？

  - 通过设置隔离级别来解决并发问题

- 4、隔离级别

  ```mysql
  							脏读			不可重复读		  幻读
  read uncommitted:读未提交     ×                ×              ×        
  read committed：读已提交      √                ×              ×
  repeatable read：可重复读     √                √              ×
  serializable：串行化          √                √              √
  ```

- Oracle 支持的2 种事务隔离级别：READ COMMITED, SERIALIZABLE。Oracle 默认的事务隔离级别为: READ COMMITED

- Mysql 支持4 种事务隔离级别. Mysql 默认的事务隔离级别为: REPEATABLE READ

  ```mysql
  查看隔离级别
  select @@tx_isolation;
  设置隔离级别
  set session|global transaction isolation level 隔离级别;
  
  #2.演示事务对于delete和truncate的处理的区别
  SET autocommit=0;
  START TRANSACTION;
  
  DELETE FROM account;
  ROLLBACK;
  ```

  

## 五、回滚点的演示

- savepoint 节点名;设置保存点

  ```mysql
  #3.演示savepoint 的使用
  SET autocommit=0;
  
  START TRANSACTION;
  DELETE FROM account WHERE id=25;
  SAVEPOINT a;#设置保存点
  DELETE FROM account WHERE id=28;
  ROLLBACK TO a;#回滚到保存点
  
  SELECT * FROM account;
  ```

  
