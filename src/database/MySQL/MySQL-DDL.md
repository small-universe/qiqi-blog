---
title: MySQL-DDL
category: 数据库
tags:
 - mysql
---

> ![](https://img.shields.io/badge/DDL-Data_Definition_Language-blue.svg) 

<!-- more -->



<h2 style="color:#ab4642" align="center">DDL语言</h2>

**数据定义语言**

- **库的管理**

  （1）创建库：create database

  （2）修改库：alter database

  （3）删除库：drop database

- **表的管理**

  （1）表的创建：create table

  （2）表的修改：alter table

  （3）表的删除：drop table

  （4）表的复制：create table 表1 like 表2

- **数据类型**

  （1）数值型

  （2）字符型

  （3）日期型

## 一、库的管理

### （一）创建库

```sql
create database 【if not exists】 库名【 character set 字符集名】;
#案例：创建库Books
  CREATE DATABASE IF NOT EXISTS books ;

```

### （二）修改库

```sql
alter database 库名 character set 字符集名;
# 案例：更改库的字符集
ALTER DATABASE books CHARACTER SET gbk;

```

### （三）删除库

```sql
drop database 【if exists】 库名;
# 案例：库的删除
DROP DATABASE IF EXISTS books;

```

## 二、表的管理

### （一）表的创建 ★

```sql
/*
语法：
create table 表名(
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	...
	列名 列的类型【(长度) 约束】
)
*/
#案例：创建表Book
CREATE TABLE book (
  id INT,
  #编号
  bName VARCHAR (20),
  #图书名
  price DOUBLE,
  #价格
  authorId INT,
  #作者编号
  publishDate DATETIME#出版日期
) ;

DESC book;

#案例：创建表author
CREATE TABLE IF NOT EXISTS author (
  id INT,
  au_n`author`ame VARCHAR (20),
  nation VARCHAR (10)
);
DESC author ;
 
```

### （二）表的修改

```sql
1.添加列
alter table 表名 add column 列名 类型 【first|after 字段名】;
2.修改列的类型或约束
alter table 表名 modify column 列名 新类型 【新约束】;
3.修改列名
alter table 表名 change column 旧列名 新列名 类型;
4.删除列
alter table 表名 drop column 列名;
5.修改表名
alter table 表名 rename 【to】 新表名;

案例：
#①修改列名
ALTER TABLE book CHANGE COLUMN publishdate pubDate DATETIME ;

#②修改列的类型或约束
ALTER TABLE book MODIFY COLUMN pubdate TIMESTAMP;

#③添加新列
ALTER TABLE author ADD COLUMN annual DOUBLE; 

#④删除列
ALTER TABLE book_author DROP COLUMN  annual;

#⑤修改表名
ALTER TABLE book_author RENAME TO author;

DESC book;

```

### （三）表的删除

```sql
drop table【if exists】 表名;

案例：
DROP TABLE IF EXISTS book_author;

SHOW TABLES;

#通用的写法：
DROP DATABASE IF EXISTS 旧库名;
CREATE DATABASE 新库名 ;

DROP TABLE IF EXISTS 旧表名;
CREATE TABLE  表名();
```

### （四）表的复制

```sql
1、复制表的结构
create table 表名 like 旧表;
2、复制表的结构+数据
create table 表名 
select 查询列表 from 旧表【where 筛选】;

案例
INSERT INTO author VALUES
(1,'村上春树','日本'),
(2,'莫言','中国'),
(3,'冯唐','中国'),
(4,'金庸','中国');

SELECT * FROM Author;
SELECT * FROM copy2;

#1.仅仅复制表的结构
CREATE TABLE copy LIKE author;

#2.复制表的结构+数据
CREATE TABLE copy2 SELECT * FROM author;

#只复制部分数据
CREATE TABLE copy3 SELECT id,au_name
FROM author WHERE nation='中国';

#仅仅复制某些字段
CREATE TABLE copy4 SELECT id,au_name
FROM author WHERE 0;

```

## 三、数据类型

### （一）数值型

**1、整型**

- 分类：

  ```sql
  tinyint、smallint、mediumint、int/integer、bigint
  1	       2		   3	       4		 8
  ```

- 特点：

  ① 如果不设置无符号还是有符号，默认是有符号，如果想设置无符号，需要添加unsigned关键字

  ② 如果插入的数值超出了整型的范围,会报out of range异常，并且插入临界值

  ③ 如果不设置长度，会有默认的长度
  	长度代表了显示的最大宽度，如果不够会用0在左边填充，但必须搭配zerofill使用！

- 案例

  ```mysql
  #1.如何设置无符号和有符号
  DROP TABLE IF EXISTS tab_int ;
  
  CREATE TABLE tab_int (t1 INT (7) ZEROFILL, t2 INT (7) ZEROFILL) ;
  
  DESC tab_int ;
  
  INSERT INTO tab_int VALUES (- 123456) ;
  
  INSERT INTO tab_int VALUES (- 123456, - 123456) ;
  
  INSERT INTO tab_int VALUES (2147483648, 4294967296) ;
  
  INSERT INTO tab_int VALUES (123, 123) ;
  
  SELECT * FROM tab_int ;
  ```

  

**2、浮点型**

- 定点数：decimal(M,D)

- 浮点数：float(M,D) 4；double(M,D) 8

- 特点：

  ①M代表整数部位+小数部位的个数，D代表小数部位

  ②如果超出范围，则报out or range异常，并且插入临界值

  ③M和D都可以省略，但对于定点数，M默认为10，D默认为0

  ④如果精度要求较高，则优先考虑使用定点数

- 案例

  ```mysql
  #测试M和D
  DROP TABLE tab_float ;
  
  CREATE TABLE tab_float (f1 FLOAT, f2 DOUBLE, f3 DECIMAL) ;
  
  SELECT * FROM tab_float ;
  
  DESC tab_float ;
  
  INSERT INTO tab_float VALUES(123.4523,123.4523,123.4523);
  INSERT INTO tab_float VALUES(123.456,123.456,123.456);
  INSERT INTO tab_float VALUES(123.4,123.4,123.4);
  INSERT INTO tab_float VALUES(1523.4,1523.4,1523.4);
  
  #原则：
  #所选择的类型越简单越好，能保存数值的类型越小越好
  ```

  

### （二）字符型

- 较短的文本：char、varchar

- 其他：

  ①binary和varbinary用于保存较短的二进制

  ②enum用于保存枚举

  ③set用于保存集合

- 较长的文本：text、blob(较大的二进制)

- 特点

  ```sql
  写法			          M的意思						  特点		  空间的耗费	   效率
  char	char(M)		最大的字符数，可以省略，默认为1	 固定长度的字符	 比较耗费	   高
  
  varchar	varchar(M)	最大的字符数，不可以省略		   可变长度的字符	   比较节省		 低
  
  ```

- 案例

  ```mysql
  CREATE TABLE tab_char(
  	c1 ENUM('a','b','c')
  );
  
  INSERT INTO tab_char VALUES('a');
  INSERT INTO tab_char VALUES('b');
  INSERT INTO tab_char VALUES('c');
  INSERT INTO tab_char VALUES('m');
  INSERT INTO tab_char VALUES('A');
  
  SELECT * FROM tab_set;
  
  CREATE TABLE tab_set(
  	s1 SET('a','b','c','d')
  );
  INSERT INTO tab_set VALUES('a');
  INSERT INTO tab_set VALUES('A,B');
  INSERT INTO tab_set VALUES('a,c,d');
   
  ```

  

### （三）日期型

- 分类：

  ①date只保存日期；

  ②time 只保存时间；

  ③year只保存年；

  ④datetime保存日期+时间；

  ⑤timestamp保存日期+时间；

- 特点

  ```sql
  			字节		范围			时区等的影响
  datetime	 8		1000——9999	       不受
  timestamp	 4	    1970-2038	        受
  ```

- 案例

  ```mysql
  CREATE TABLE tab_date(
  	t1 DATETIME,
  	t2 TIMESTAMP
  );
  
  INSERT INTO tab_date VALUES(NOW(),NOW());
  
  SELECT * FROM tab_date;
  
  SHOW VARIABLES LIKE 'time_zone';
  
  SET time_zone='+9:00';
  ```



## 四、常见的约束

- **含义**：一种限制，用于限制表中的数据，为了保证表中的数据的准确和可靠性。

- **分类**

  ```sql
  六大约束
  	NOT NULL：非空，用于保证该字段的值不能为空
  	比如姓名、学号等
  	DEFAULT:默认，用于保证该字段有默认值
  	比如性别
  	PRIMARY KEY:主键，用于保证该字段的值具有唯一性，并且非空
  	比如学号、员工编号等
  	UNIQUE:唯一，用于保证该字段的值具有唯一性，可以为空
  	比如座位号
  	CHECK:检查约束【mysql中不支持】
  	比如年龄、性别
  	FOREIGN KEY:外键，用于限制两个表的关系，用于保证该字段的值必须来自于主表的关联列的值
  		在从表添加外键约束，用于引用主表中某列的值
  	比如学生表的专业编号，员工表的部门编号，员工表的工种编号
  ```

- **添加约束的时机**：

  （1）创建表时；

  （2）修改表时

- **约束的添加分类**：

  （1）列级约束：六大约束语法上都支持，但外键约束没有效果

  （2）表级约束：除了非空、默认，其他的都支持

- **语法**

  ```mysql
  CREATE TABLE 表名{
  	字段名 字段类型 列级约束,
  	字段名 字段类型,
  	表级约束
  };
  ```

  

------

### （一）创建表时添加约束

**1、添加列级约束**

- 语法：直接在字段名和类型后面追加 约束类型即可。只支持：默认、非空、主键、唯一

- 案例

  ```mysql
  #先新建一个库
  CREATE DATABASE students;
  
  USE students;
  
  DROP TABLE stuinfo;
  
  CREATE TABLE stuinfo(
  	id INT PRIMARY KEY,#主键
  	stuName VARCHAR(20) NOT NULL UNIQUE,#非空
  	gender CHAR(1) CHECK(gender='男' OR gender ='女'),#检查
  	seat INT UNIQUE,#唯一
  	age INT DEFAULT  18,#默认约束
  	majorId INT REFERENCES major(id)#外键
  );
  
  CREATE TABLE major(
  	id INT PRIMARY KEY,
  	majorName VARCHAR(20)
  );
  
  #查看stuinfo中的所有索引，包括主键、外键、唯一
  SHOW INDEX FROM stuinfo;
  ```

**2、添加表级约束**

-   语法：在各个字段的最下面 【constraint 约束名】 约束类型(字段名)

  ```sql
    TABLE IF EXISTS stuinfo;
    CREATE TABLE stuinfo(
    	id INT,
    	stuname VARCHAR(20),
    	gender CHAR(1),
    	seat INT,
    	age INT,
    	majorid INT,
    	
    	CONSTRAINT pk PRIMARY KEY(id),#主键
    	CONSTRAINT uq UNIQUE(seat),#唯一键
    	CONSTRAINT ck CHECK(gender ='男' OR gender  = '女'),#检查
    	CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id)#外键	
    );
    
    SHOW INDEX FROM stuinfo;
  ```

- :star:通用的写法：

  ```mysql
  CREATE TABLE IF NOT EXISTS stuinfo(
  	id INT PRIMARY KEY,
  	stuname VARCHAR(20),
  	sex CHAR(1),
  	age INT DEFAULT 18,
  	seat INT UNIQUE,
  	majorid INT,
  	CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id)
  );
  
  create table 表名(
    	字段名 字段类型 not null,#非空
    	字段名 字段类型 primary key,#主键
    	字段名 字段类型 unique,#唯一
    	字段名 字段类型 default 值,#默认
    	constraint 约束名 foreign key(字段名) references 主表（被引用列）
  );
  
  注意：
    			   支持类型		      可以起约束名			
  列级约束		除了外键		     不可以
  表级约束		除了非空和默认	  可以，但对主键无效
    
  列级约束可以在一个字段上追加多个，中间用空格隔开，没有顺序要求
  ```

- 主键和唯一的区别

  ```cmd
  		保证唯一性  是否允许为空        一个表中可以有多少个                  是否允许组合
  主键		√				×			至多有1个主键                       √，但不推荐
  唯一		√				√			可以有多个字段设置为唯一              √，但不推荐
  ```

  
  
### （二）修改表时添加约束

- **语法**

  ```mysql
  1、添加列级约束
  alter table 表名 modify column 字段名 字段类型 新约束;
  
  2、添加表级约束
  alter table 表名 add 【constraint 约束名】 约束类型(字段名) 【外键的引用】;
  ```

- **案例**

  ```mysql
  DROP TABLE IF EXISTS stuinfo;
  CREATE TABLE stuinfo(
  	id INT,
  	stuname VARCHAR(20),
  	gender CHAR(1),
  	seat INT,
  	age INT,
  	majorid INT
  );
  
  DESC stuinfo;
  #1.添加非空约束
  ALTER TABLE stuinfo MODIFY COLUMN stuname VARCHAR(20)  NOT NULL;
  
  #2.添加默认约束
  ALTER TABLE stuinfo MODIFY COLUMN age INT DEFAULT 18;
  
  #3.添加主键
      #①列级约束
      ALTER TABLE stuinfo MODIFY COLUMN id INT PRIMARY KEY;
      #②表级约束
      ALTER TABLE stuinfo ADD PRIMARY KEY(id);
  
  #4.添加唯一
      #①列级约束
      ALTER TABLE stuinfo MODIFY COLUMN seat INT UNIQUE;
      #②表级约束
      ALTER TABLE stuinfo ADD UNIQUE(seat);
  
  #5.添加外键
  ALTER TABLE stuinfo ADD CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id); 
  ```

  
  
### （三）修改表时删除约束

- ```mysql
  #1.删除非空约束
  ALTER TABLE stuinfo MODIFY COLUMN stuname VARCHAR(20) NULL;
  
  #2.删除默认约束
  ALTER TABLE stuinfo MODIFY COLUMN age INT ;
  
  #3.删除主键
  ALTER TABLE stuinfo DROP PRIMARY KEY;
  
  #4.删除唯一
  ALTER TABLE stuinfo DROP INDEX seat;
  
  #5.删除外键
  ALTER TABLE stuinfo DROP FOREIGN KEY fk_stuinfo_major;
  
  SHOW INDEX FROM stuinfo;
  ```

  

### （四）修改表时添加或删除约束的具体语法总结

- ```sql
  1、非空
  添加非空
  alter table 表名 modify column 字段名 字段类型 not null;
  删除非空
  alter table 表名 modify column 字段名 字段类型 ;
  
  2、默认
  添加默认
  alter table 表名 modify column 字段名 字段类型 default 值;
  删除默认
  alter table 表名 modify column 字段名 字段类型 ;
  
  3、主键
  添加主键
  alter table 表名 add【 constraint 约束名】 primary key(字段名);
  删除主键
  alter table 表名 drop primary key;
  
  4、唯一
  添加唯一
  alter table 表名 add【 constraint 约束名】 unique(字段名);
  删除唯一
  alter table 表名 drop index 索引名;
  
  5、外键
  添加外键
  alter table 表名 add【 constraint 约束名】 foreign key(字段名) references 主表（被引用列）;
  删除外键
  alter table 表名 drop foreign key 约束名;
  ```

  

### （五）自增长列(标识列)

- **含义**：可以不用手动的插入值，系统提供默认的序列值

- **特点**

  ```sql
  1.不用手动插入值，可以自动提供序列值，默认从1开始，步长为1
    auto_increment_increment
    如果要更改起始值：手动插入值
    如果要更改步长：更改系统变量
    set auto_increment_increment=值;
  2.一个表至多有一个自增长列
  3.自增长列只能支持数值型
  4.自增长列必须为一个key
  ```

- **案例**

  ```mysql
  #一、创建表时设置标识列
  DROP TABLE IF EXISTS tab_identity;
  
  CREATE TABLE tab_identity(
  	id INT  ,
  	NAME FLOAT UNIQUE AUTO_INCREMENT,
  	seat INT 
  ) TRUNCATE TABLE tab_identity;
  
  INSERT INTO tab_identity(id,NAME) VALUES(NULL,'john');
  
  INSERT INTO tab_identity(NAME) VALUES('lucy');
  
  SELECT * FROM tab_identity;
  
  SHOW VARIABLES LIKE '%auto_increment%';
  
  SET auto_increment_increment=3;
  ```

- **语法总结**

  ```mysql
  一、创建表时设置自增长列
  create table 表(
  	字段名 字段类型 约束 auto_increment
  );
  
  二、修改表时设置自增长列
  alter table 表 modify column 字段名 字段类型 约束 auto_increment;
  
  三、删除自增长列
  alter table 表 modify column 字段名 字段类型 约束;
  ```

