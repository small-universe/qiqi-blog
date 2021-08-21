---
title: MySQL-other
category: 数据库
tags:
 - mysql
---

> ![](https://img.shields.io/badge/MySQL基础-其他-blue.svg) 

<!-- more -->

<h2 style="color:#ab4642" align="center">MySQL基础-其他</h2>

1. 视图
2. 变量
3. 存储过程和函数

## 一、视图

### （一）什么是视图

- **视图**：虚拟表,和普通表一样使用。mysql5.1版本出现的新特性，是通过表动态生成的数据。

  ​			创建视图可以类比Java中创建一个方法

- **应用场景**

  （1）多个地方用到同样的查询结果

  （2）该查询结果使用的sql语句较复杂

- **案例**

  ```sql
  SELECT stuname,majorname FROM stuinfo s
  INNER JOIN major m ON s.`majorid`= m.`id`
  WHERE s.`stuname` LIKE '张%';
  
  CREATE VIEW v1 AS
  SELECT stuname,majorname
  FROM stuinfo s
  INNER JOIN major m ON s.`majorid`= m.`id`;
  
  SELECT * FROM v1 WHERE stuname LIKE '张%';
  ```

  

### （二）视图的创建

- **语法**：create view 视图名 as 查询语句;

- **案例**

  ```sql
  USE myemployees;
  
  #1.查询姓名中包含a字符的员工名、部门名和工种信息
      #①创建
      CREATE VIEW myv1 AS
      SELECT last_name,department_name,job_title
      FROM employees e
      JOIN departments d ON e.department_id  = d.department_id
      JOIN jobs j ON j.job_id  = e.job_id;
  
      #②使用
      SELECT * FROM myv1 WHERE last_name LIKE '%a%';
  
  #2.查询各部门的平均工资级别
      #①创建视图查看每个部门的平均工资
      CREATE VIEW myv2 AS
      SELECT AVG(salary) ag,department_id
      FROM employees GROUP BY department_id;
  
      #②使用
      SELECT myv2.`ag`,g.grade_level FROM myv2
      JOIN job_grades g
      ON myv2.`ag` BETWEEN g.`lowest_sal` AND g.`highest_sal`;
  
  #3.查询平均工资最低的部门信息
  SELECT * FROM myv2 ORDER BY ag LIMIT 1;
  
  #4.查询平均工资最低的部门名和工资
      CREATE VIEW myv3 AS
      SELECT * FROM myv2 ORDER BY ag LIMIT 1;
  
      SELECT d.*,m.ag FROM myv3 m
      JOIN departments d
      ON m.`department_id`=d.`department_id`;
  ```

  

- **视图的好处**

  （1）重用sql语句

  （2）简化复杂的sql操作，不必知道它的查询细节

  （3）保护数据，提高安全性

### （三）视图的修改

- 语法

  ```sql
  方式一：
  create or replace view 视图名 as 查询语句;
  方式二：
  alter view 视图名 as 查询语句;
  ```

- 案例

  ```sql
  #方式一：
  /*
  create or replace view  视图名 as 查询语句;
  */
  SELECT * FROM myv3 
  
  CREATE OR REPLACE VIEW myv3 AS
  SELECT AVG(salary),job_id
  FROM employees GROUP BY job_id;
  
  #方式二：
  /*
  语法：
  alter view 视图名 as 查询语句;
  */
  ALTER VIEW myv3 AS SELECT * FROM employees;
  ```

  

### （四）视图的删除

用户可以一次删除一个或者多个视图，前提是必须有该视图的drop权限。

- **语法**：drop view 视图1，视图2,…;

- **案例**

  ```sql
  /*
  语法：drop view 视图名,视图名,...;
  */
  DROP VIEW emp_v1,emp_v2,myv3;
  ```

  

### （五）视图的查看

- **语法**

  ```sql
  desc 视图名;
  show create view 视图名;
  ```

- **案例**

  ```sql
  DESC myv3;
  SHOW CREATE VIEW myv3;
  ```

  

### （六）视图的更新

- **插入**：insert

- **修改**：update

- **删除**：delete

- **查看**：select

  ```sql
  CREATE OR REPLACE VIEW myv1
  AS
  SELECT last_name,email,salary*12*(1+IFNULL(commission_pct,0)) "annual salary"
  FROM employees;
  
  CREATE OR REPLACE VIEW myv1
  AS
  SELECT last_name,email
  FROM employees;
  
  SELECT * FROM myv1;
  SELECT * FROM employees;
  #1.插入
  
  INSERT INTO myv1 VALUES('张飞','zf@qq.com');
  
  #2.修改
  UPDATE myv1 SET last_name = '张无忌' WHERE last_name='张飞';
  
  #3.删除
  DELETE FROM myv1 WHERE last_name = '张无忌';
  ```

- **注意**：视图一般用于查询的，而不是更新的，所以具备以下特点的视图都不允许更新

  （1）包含以下关键字的sql语句：分组函数、distinct、group by、having、union或者union all

  （2）常量视图

  （3）select中包含子查询

  （4）join

  （5）from一个不能更新的视图

  （6）where子句的子查询引用了from子句中的表

  ```sql
  #具备以下特点的视图不允许更新
  #①包含以下关键字的sql语句：分组函数、distinct、group  by、having、union或者union all
  CREATE OR REPLACE VIEW myv1
  AS
  SELECT MAX(salary) m,department_id
  FROM employees
  GROUP BY department_id;
  
  SELECT * FROM myv1;
  
  #更新
  UPDATE myv1 SET m=9000 WHERE department_id=10;
  
  #②常量视图
  CREATE OR REPLACE VIEW myv2
  AS
  SELECT 'john' NAME;
  
  SELECT * FROM myv2;
  
  #更新
  UPDATE myv2 SET NAME='lucy';
  
  #③Select中包含子查询
  
  CREATE OR REPLACE VIEW myv3
  AS
  SELECT department_id,(SELECT MAX(salary) FROM employees) 最高工资
  FROM departments;
  
  #更新
  SELECT * FROM myv3;
  UPDATE myv3 SET 最高工资=100000;
  
  #④join
  CREATE OR REPLACE VIEW myv4
  AS
  SELECT last_name,department_name
  FROM employees e
  JOIN departments d
  ON e.department_id  = d.department_id;
  
  #更新
  SELECT * FROM myv4;
  UPDATE myv4 SET last_name  = '张飞' WHERE last_name='Whalen';
  INSERT INTO myv4 VALUES('陈真','xxxx');
  
  #⑤from一个不能更新的视图
  CREATE OR REPLACE VIEW myv5
  AS SELECT * FROM myv3;
  
  #更新
  SELECT * FROM myv5;
  UPDATE myv5 SET 最高工资=10000 WHERE department_id=60;
  
  #⑥where子句的子查询引用了from子句中的表
  
  CREATE OR REPLACE VIEW myv6
  AS
  SELECT last_name,email,salary
  FROM employees
  WHERE employee_id IN(
  	SELECT  manager_id
  	FROM employees
  	WHERE manager_id IS NOT NULL
  );
  
  #更新
  SELECT * FROM myv6;
  UPDATE myv6 SET salary=10000 WHERE last_name = 'k_ing';
  ```

  

### （七）视图和表的对比

```cmd
	    关键字		  是否占用物理空间			 使用
视图	  view	    占用较小，只保存sql逻辑	 一般用于查询
表	   table		保存实际的数据			  增删改查
```



## 二、变量

### （一）变量的介绍

- 系统变量：

  （1）全局变量

  （2）会话变量

- 自定义变量：

  （3）用户变量

  （4）局部变量

### （二）系统变量的介绍和语法

- **说明**：变量由系统定义，不是用户定义，属于服务器层面

- **注意**：全局变量需要添加global关键字，会话变量需要添加session关键字，如果不写，默认会话级别

- **使用步骤**：

  （1）查看所有系统变量

  ```sql
  show global|【session】variables;
  ```

  （2）查看满足条件的部分系统变量

  ```sql
  show global|【session】 variables like '%char%';
  ```

  （3）查看指定的系统变量的值

  ```sql
  select @@global|【session】系统变量名;
  ```

  （4）为某个系统变量赋值

  ```sql
  方式一：
  set global|【session】系统变量名=值;
  方式二：
  set @@global|【session】系统变量名=值;
  ```

### （三）全局变量的演示

```sql
#1》全局变量
/*
作用域：针对于所有会话（连接）有效，但不能跨重启
*/
#①查看所有全局变量
SHOW GLOBAL VARIABLES;
#②查看满足条件的部分系统变量
SHOW GLOBAL VARIABLES LIKE '%char%';
#③查看指定的系统变量的值
SELECT @@global.autocommit;
#④为某个系统变量赋值
SET @@global.autocommit=0;
SET GLOBAL autocommit=0;
```

### （四）会话变量的演示

```sql
#2》会话变量
/*
作用域：针对于当前会话（连接）有效
*/
#①查看所有会话变量
SHOW SESSION VARIABLES;
#②查看满足条件的部分会话变量
SHOW SESSION VARIABLES LIKE '%char%';
#③查看指定的会话变量的值
SELECT @@autocommit;
SELECT @@session.tx_isolation;
#④为某个会话变量赋值
SET @@session.tx_isolation='read-uncommitted';
SET SESSION tx_isolation='read-committed';
```

### （五）自定义变量—用户变量

```sql
#二、自定义变量
/*
说明：变量由用户自定义，而不是系统提供的
使用步骤：
1、声明
2、赋值
3、使用（查看、比较、运算等）
*/

#1》用户变量
/*
作用域：针对于当前会话（连接）有效，作用域同于会话变量
*/

#赋值操作符：=或:=
#①声明并初始化
SET @变量名=值;
SET @变量名:=值;
SELECT @变量名:=值;

#②赋值（更新变量的值）
#方式一：
	SET @变量名=值;
	SET @变量名:=值;
	SELECT @变量名:=值;
#方式二：
	SELECT 字段 INTO @变量名
	FROM 表;
#③使用（查看变量的值）
SELECT @变量名;
```

### （六）自定义变量—局部变量

```sql
#2》局部变量
/*
作用域：仅仅在定义它的begin end块中有效
应用在 begin end中的第一句话
*/

#①声明
DECLARE 变量名 类型;
DECLARE 变量名 类型 【DEFAULT 值】;


#②赋值（更新变量的值）

#方式一：
	SET 局部变量名=值;
	SET 局部变量名:=值;
	SELECT 局部变量名:=值;
#方式二：
	SELECT 字段 INTO 具备变量名
	FROM 表;
#③使用（查看变量的值）
SELECT 局部变量名;


#案例：声明两个变量，求和并打印
#用户变量
SET @m=1;
SET @n=1;
SET @sum=@m+@n;
SELECT @sum;

#局部变量
DECLARE m INT DEFAULT 1;
DECLARE n INT DEFAULT 1;
DECLARE SUM INT;
SET SUM=m+n;
SELECT SUM;
```

### （七）用户变量和局部变量的对比

```sql
		   作用域			           定义位置		            语法
用户变量	当前会话		          会话的任何地方		加@符号，不用指定类型
局部变量	定义它的BEGIN END中  	BEGIN END的第一句话	一般不用加@,需要指定类型
```



## 三、存储过程和函数

- **说明**：都类似于java中的方法，将一组完成特定功能的逻辑语句包装起来，对外暴露名字

- **好处**

  （1）提高代码的重用性

  （2）简化操作

  （3）减少了编译次数并且减少了和数据库服务器的连接次数，提高了效率

### （一）存储过程

- **含义**：一组预先编译好的SQL语句的集合，理解成批处理语句

- **创建语法**

  ```sql
  CREATE PROCEDURE 存储过程名(参数列表)
  BEGIN
  	存储过程体（一组合法的SQL语句）
  END
  
  注意：
  1、参数列表包含三部分
  参数模式  参数名  参数类型
  举例：
  in stuname varchar(20)
  
  参数模式：
  in：该参数可以作为输入，也就是该参数需要调用方传入值
  out：该参数可以作为输出，也就是该参数可以作为返回值
  inout：该参数既可以作为输入又可以作为输出，也就是该参数既需要传入值，又可以返回值
  
  2、如果存储过程体仅仅只有一句话，begin end可以省略
  存储过程体中的每条sql语句的结尾要求必须加分号。
  存储过程的结尾可以使用 delimiter 重新设置
  语法：
  delimiter 结束标记
  案例：
  delimiter $
  ```

- **调用语法**

  ```sql
  CALL 存储过程名(实参列表);
  
  举例：
  调用in模式的参数：call sp1（‘值’）;
  调用out模式的参数：set @name; call sp1(@name);select @name;
  调用inout模式的参数：set @name=值; call sp1(@name); select @name;
  ```

- 案例

  ```sql
  #1.空参列表
  #案例：插入到admin表中五条记录
  SELECT * FROM admin;
  
  DELIMITER $
  CREATE PROCEDURE myp1()
  BEGIN
  	INSERT INTO admin(username,`password`) 
  	VALUES('john1','0000'),('lily','0000'),('rose','0000'),('jack','0000'),('tom','0000');
  END $
  
  #调用
  CALL myp1()$
  
  #2.创建带in模式参数的存储过程
  
  #案例1：创建存储过程实现 根据女神名，查询对应的男神信息
  
  CREATE PROCEDURE myp2(IN beautyName VARCHAR(20))
  BEGIN
  	SELECT bo.*
  	FROM boys bo
  	RIGHT JOIN beauty b ON bo.id = b.boyfriend_id
  	WHERE b.name=beautyName;
  END $
  
  #调用
  CALL myp2('柳岩')$
  
  #案例2 ：创建存储过程实现，用户是否登录成功
  CREATE PROCEDURE myp3(IN username VARCHAR(20),IN PASSWORD VARCHAR(20))
  BEGIN
  	DECLARE result VARBINARY(20) DEFAULT '';#声明并初始化
  	
  	SELECT COUNT(*) INTO result#赋值
  	FROM admin
  	WHERE admin.username = username
  	AND admin.password = PASSWORD;
  	
  	SELECT result;#使用
  END $
  
  CALL myp3('张飞','8888')$
  
  CREATE PROCEDURE myp4(IN username VARCHAR(20),IN PASSWORD VARCHAR(20))
  BEGIN
  	DECLARE result INT DEFAULT 0;#声明并初始化
  	
  	SELECT COUNT(*) INTO result#赋值
  	FROM admin
  	WHERE admin.username = username
  	AND admin.password = PASSWORD;
  	
  	SELECT IF(result>0,'成功','失败');#使用
  END $
  
  #调用
  CALL myp4('张飞','8888')$
  
  
  #3.创建out 模式参数的存储过程
  #案例1：根据输入的女神名，返回对应的男神名
  CREATE PROCEDURE myp6(IN beautyName VARCHAR(20),OUT boyName VARCHAR(20))
  BEGIN
  	SELECT bo.boyname INTO boyname
  	FROM boys bo
  	RIGHT JOIN
  	beauty b ON b.boyfriend_id = bo.id
  	WHERE b.name=beautyName ;
  	
  END $
  
  #案例2：根据输入的女神名，返回对应的男神名和魅力值
  CREATE PROCEDURE myp7(IN beautyName VARCHAR(20),OUT boyName VARCHAR(20),OUT usercp INT) 
  BEGIN
  	SELECT boys.boyname ,boys.usercp INTO boyname,usercp
  	FROM boys 
  	RIGHT JOIN
  	beauty b ON b.boyfriend_id = boys.id
  	WHERE b.name=beautyName ;
  	
  END $
  
  #调用
  CALL myp7('小昭',@name,@cp)$
  SELECT @name,@cp$
  
  #4.创建带inout模式参数的存储过程
  #案例1：传入a和b两个值，最终a和b都翻倍并返回
  
  CREATE PROCEDURE myp8(INOUT a INT ,INOUT b INT)
  BEGIN
  	SET a=a*2;
  	SET b=b*2;
  END $
  
  #调用
  SET @m=10$
  SET @n=20$
  CALL myp8(@m,@n)$
  SELECT @m,@n$
  ```

- **查看语法**

  ```sql
  show create procedure 存储过程名;
  
  案例
  DESC myp2;×
  SHOW CREATE PROCEDURE  myp2;
  ```

- **删除语法**

  ```sql
  drop procedure 存储过程名;
  
  案例:
  DROP PROCEDURE p1;
  DROP PROCEDURE p2,p3;
  ```



### （二）函数

- **含义**：一组预先编译好的SQL语句的集合，理解成批处理语句

- **区别**：

  （1）存储过程：可以有0个返回，也可以有多个返回，适合做批量插入、批量更新；

  （2）函数：有且仅有1 个返回，适合做处理数据后返回一个结果。

- **创建语法**

  ```sql
  CREATE FUNCTION 函数名(参数列表) RETURNS 返回类型
  BEGIN
  	函数体
  END
  
  /*
  注意：
  1.参数列表 包含两部分：
  参数名 参数类型
  2.函数体：肯定会有return语句，如果没有会报错
  如果return语句没有放在函数体的最后也不报错，但不建议
  
  return 值;
  3.函数体中仅有一句话，则可以省略begin end
  4.使用 delimiter语句设置结束标记
  */
  
  DELIMITER $
  ```

- **调用语法**

  SELECT 函数名(参数列表);

  案例

  ```sql
  use employees $
  #1.无参有返回
  #案例：返回公司的员工个数
  CREATE FUNCTION myf1() RETURNS INT
  BEGIN	
  	DECLARE c INT DEFAULT 0;
  	SELECT COUNT(*) INTO c
  	FROM employees;
  	RETURN c;
  END $
  
  SELECT myf1()$
  
  
  #2.有参有返回
  #案例1：根据员工名，返回它的工资
  CREATE FUNCTION myf2(empName VARCHAR(20)) RETURNS DOUBLE
  BEGIN
  	SET @sal=0;#定义用户变量 
  	SELECT salary INTO @sal   #赋值
  	FROM employees
  	WHERE last_name = empName;
  	
  	RETURN @sal;
  END $
  
  SELECT myf2('kochhor') $
  
  #案例2：根据部门名，返回该部门的平均工资
  CREATE FUNCTION myf3(deptName VARCHAR(20)) RETURNS DOUBLE
  BEGIN
  	DECLARE sal DOUBLE ;
  	SELECT AVG(salary) INTO sal
  	FROM employees e
  	JOIN departments d ON e.department_id = d.department_id
  	WHERE d.department_name=deptName;
  	RETURN sal;
  END $
  
  SELECT myf3('IT')$
  ```

- **查看函数**

  ```sql
  show create function 函数名;
  
  SHOW CREATE FUNCTION myf3 $
  ```

- **删除函数**

  ```sql
  drop function 函数名;
  
  DROP FUNCTION myf3 $
  ```

  

### （三）流程控制结构

- 顺序结构：程序从上往下依次执行
- 分支结构：程序按条件进行选择执行，从两条或多条路径中选择一条执行
- 循环结构：程序满足一定条件下，重复执行一组语句

**1、分支结构**

- if函数

  语法：if(条件,值1，值2)；

  功能：实现双分支；

  应用：可以作为表达式放在任何位置

- case结构

  语法：

  ```sql
  情况1：类似于switch，一般用于实现等值判断。
  语法：
  case 变量或表达式
  when 值1 then 语句1;
  when 值2 then 语句2;
  ...
  else 语句n;
  end 
  
  情况2：类似于多重if语句，一般用于实现区间判断。
  语法：
  case 
  when 条件1 then 语句1;
  when 条件2 then 语句2;
  ...
  else 语句n;
  end 
  ```

  **特点**

  （1）可以作为表达式，嵌套在其他语句中使用。

  （2）可以放在任何地方，BEGIN END 中或BEGIN END 的外面可以作为独立的语句去使用，只能放在BEGIN END中如果wHEN中的值满足或条件成立，则执行对应的THzN后面的语句，并且结束CASE如果都不满足，则执行E1SE中的语句或值。

  （3）ELSE可以省略，如果ELSE省略了，并且所有WHEN条件都不满足，则返回NULL。

  **位置**

  （1）可以放在任何位置，

  （2）如果放在begin end 外面，作为表达式结合着其他语句使用

  （3）如果放在begin end 里面，一般作为独立的语句使用

  **案例**

  ```sql
  #案例 
  #创建存储过程，根据传入的成绩，来显示等级，比如传入的成绩：90-100, 显示A，80-90，显示B，60-80，显示c，否则，显示D
  
  CREATE PROCEDURE test_case (IN score INT) 
  BEGIN 
  	CASE 
  	WHEN score>=90 AND score<=100 THEN SELECT 'A'; 
  	WHEN score>=80 THEN SELECT 'B';
  	WHEN score>=60 THEN SELECT 'C'; 
  	ELSE SELECT 'D';
  	END CASE; 
  END $
  CALL test_case(95)$
  ```

- if结构

  语法：

  ```sql
  if 条件1 then 语句1;
  elseif 条件2 then 语句2;
  ....
  else 语句n;
  end if;
  ```

  功能：类似于多重if；只能应用在begin end 中

  ```sql
  #案例1：创建函数，实现传入成绩，如果成绩>90,返回A，如果成绩>80,返回B，如果成绩>60,返回C，否则返回D
  CREATE FUNCTION test_case(score FLOAT) RETURNS CHAR
  BEGIN 
  	DECLARE ch CHAR DEFAULT 'A';
  	
  	CASE 
  	WHEN score>90 THEN SET ch='A';
  	WHEN score>80 THEN SET ch='B';
  	WHEN score>60 THEN SET ch='C';
  	ELSE SET ch='D';
  	END CASE;
  	
  	RETURN ch;
  END $
  
  SELECT test_case(56)$
  ```

  


**2、循环结构**

- **位置**：只能放在begin end中

- **特点**：都能实现循环结构

- **语法**

  ```sql
  1、while
  语法：
  【名称:】while 循环条件 do
  		循环体
  end while 【名称】;
  2、loop
  语法：
  【名称：】loop
  		循环体
  end loop 【名称】;
  
  3、repeat
  语法：
  【名称:】repeat
  		循环体
  until 结束条件 
  end repeat 【名称】;
  ```

- **对比**

  ```sql
  ①这三种循环都可以省略名称，但如果循环中添加了循环控制语句（leave或iterate）则必须添加名称
  ②
  loop 一般用于实现简单的死循环
  while 先判断后执行
  repeat 先执行后判断，无条件至少执行一次
  ```

- **循环控制语句**

  ==leave==：类似于break，用于跳出所在的循环

  ==iterate==：类似于continue，用于结束本次循环，继续下一次

  ::: warning

  循环中添加了循环控制语句（leave或iterate）则必须添加名称

  :::

- **案例**

  ```sql
  #1.没有添加循环控制语句
  #案例：批量插入，根据次数插入到admin表中多条记录
  USE girls$
  DROP PROCEDURE pro_while1$
  CREATE PROCEDURE pro_while1(IN insertCount INT)
  BEGIN
  	DECLARE i INT DEFAULT 1;
  	WHILE i<=insertCount DO
  		INSERT INTO admin(username,`password`) VALUES(CONCAT('Rose',i),'666');
  		SET i=i+1;
  	END WHILE;
  END $
  
  CALL pro_while1(158)$
  
  select * from admin $
  /*
  int i=1;
  while(i<=insertcount){
  	//插入
  	i++;
  
  }
  */
  
  #2.添加leave语句
  #案例：批量插入，根据次数插入到admin表中多条记录，如果次数>20则停止
  TRUNCATE TABLE admin$
  DROP PROCEDURE test_while1$
  CREATE PROCEDURE test_while1(IN insertCount INT)
  BEGIN
  	DECLARE i INT DEFAULT 1;
  	a:WHILE i<=insertCount DO
  		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
  		IF i>=20 THEN LEAVE a;
  		END IF;
  		SET i=i+1;
  	END WHILE a;
  END $
  
  CALL test_while1(100)$
  
  select * from admin $
  
  #3.添加iterate语句
  #案例：批量插入，根据次数插入到admin表中多条记录，只插入偶数次
  TRUNCATE TABLE admin$
  DROP PROCEDURE test_while1$
  CREATE PROCEDURE test_while1(IN insertCount INT)
  BEGIN
  	DECLARE i INT DEFAULT 0;
  	a:WHILE i<=insertCount DO
  		SET i=i+1;
  		IF MOD(i,2)!=0 THEN ITERATE a;
  		END IF;
  		
  		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
  		
  	END WHILE a;
  END $
  
  CALL test_while1(100)$
  
  /*
  int i=0;
  while(i<=insertCount){
  	i++;
  	if(i%2==0){
  		continue;
  	}
  	插入
  }
  */
  
  select * from admin $
  ```

  



