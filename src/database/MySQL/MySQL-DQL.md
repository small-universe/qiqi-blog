---
title: MySQL-DQL
category: 数据库
tags:
  - mysql
---
> ![](https://img.shields.io/badge/DQL-Data_Query_Language-blue.svg)  

<!-- more -->

<h2 style="color:#ab4642" align="center">DQL语言</h2>



## 一、基础查询

- **语法**：select 查询列表 from 表名;

  类似于System.out.println(打印东西);

- **特点**：

  （1）查询列表可以是：表中的字段、常量值、表达式、函数。（可以是多个）

  （2）查询的结果是一个虚拟表格

- **案例**

  ```sql
  USE myemployees;
  
  #1.查询表中的单个字段
  SELECT last_name FROM employees;
  
  #2.查询表中多个字段
  SELECT last_name,salary,email FROM employees;
  
  #3.查询表中的所有字段
  SELECT * FROM employees; // InnoDB引擎尽量避免使用select *，效率不高
  
  #4.查询常量
  # select 常量值;
  # 注意：字符型和日期型的常量值必须用单引号引起来，数值型不需要
  SELECT 100;
  SELECT 'join';
  
  #5.查询函数
  #select 函数名(实参列表);
  SELECT VERSION();
  
  #6.查询表达式 
  SELECT 100%98;
  
  #7.起别名
  /*
  1.便于理解
  2.如果要查询的字段有重名的情况,使用别名区分
  */
  #方式一:使用AS
  SELECT 100%98 AS 结果;
  SELECT last_name AS 姓,first_name AS 名 FROM employees;
  
  #方式二:使用空格
  SELECT last_name 姓,first_name 名 FROM employees;
  
  #案例:查询salary,结果显示 out put
  SELECT salary AS "out put" FROM employees;
  
  #8.去重
  # select distinct 字段名 from 表名;
  #案例:查询员工表中涉及的所有部门编号
  SELECT DISTINCT department_id FROM employees;
  
  #9.+号的作用
  #案例:查询员工的名和姓,并显示为姓名
  /*
  java中的+号:
  1.运算符:两个操作数都为数据型
  2.连接符:只要有一个操作数为字符串
  
  
  mysql中的+号:
  只能作为运算符
  
  select 100+90; 两个操作数都为数值型,做加法运算
  select '123+90';其中一方为字符型,试图将字符型数值转换为数值型
  		如果转换成功,则继续做加法运算
  select 'john'+90; 如果转换失败,则将字符型数值转换成0
  
  select null+0; 只要其中一方为null,则结果肯定为null.
  */
  select 100+90; // 190
  select '123+90'; // 123+90
  select 'john'+90; // 90
  
  select null+0; // null
  SELECT last_name+first_name AS 姓名 FROM employees; // 0
  
  #10.【补充】concat函数 
  /*
  功能：拼接字符
  select concat(字符1，字符2，字符3,...);
  */
  SELECT CONCAT('a','b','c') AS 结果; // abc
  
  SELECT CONCAT(last_name,first_name) AS 姓名 FROM employees;
  
  #11.【补充】ifnull函数
  #功能：判断某字段或表达式是否为null，如果为null 返回指定的值，否则返回原本的值
  SELECT commission_pct,IFNULL(commission_pct,0) 替换NULL FROM employees;
  
  #12.【补充】isnull函数
  #功能：判断某字段或表达式是否为null，如果是，则返回1，否则返回0
  SELECT commission_pct,ISNULL(commission_pct) 替换结果 FROM employees;
  ```

  

## 二、条件查询

- **语法**：select 查询列表 from 表名 where 筛选条件;

- **分类**

  ```sql
  
    一、按条件表达式筛选
    	条件运算符:> < = != <> >= <= <=>完全等于
    	!= 和 <>等价
    二、按逻辑表达式筛选
    	逻辑运算符:&& || !
    	and or not
  
    	&& 和 and:两个条件都为true，结果为true，反之为false
    	|| 和 or:只要有一个条件为true，结果为true，反之为false
    	! 或 not:如果连接的条件本身为false，结果为true，反之为false	
  
    三、模糊查询
    	like:一般搭配通配符使用，可以判断字符型或数值型
    	通配符：%任意多个字符，_任意单个字符
    	like、between and、in、is null
    
  ```

- **案例**

  ### （一）按条件表达式筛选

  ```sql
  #案例1:查询工资>12000的员工信息
  SELECT * FROM employees WHERE salary>12000;
  
  #案例2:查询部门编号不等于90号的员工名和部门编号
  SELECT last_name,department_id FROM employees WHERE department_id <> 90;
  ```

  ### （二）按逻辑表达式筛选

  ```sql
  #案例1:查询工资z在10000到20000之间的员工名、工资及奖金
  SELECT last_name,salary,commission_pct FROM employees WHERE salary>=10000 AND salary<=20000;
  
  #案例2:查询部门编号不是在90-110之间,或者工资高于15000的员工信息
  SELECT * FROM employees WHERE department_id <90 OR department_id>110 OR salary>15000;
  ```

  ### （三）模糊查询

  **1、like**

  ```sql
  #案例1:查询员工名中包含字符a的员工信息
  SELECT * FROM employees WHERE last_name LIKE '%a%';
  
  #案例2:查询员工名中第三个字符为b，第五个字符为a的员工名和工资
  SELECT last_name,salary FROM employees WHERE last_name LIKE '__b_a%';
  
  #案例3:查询员工名种第二个字符为_的员工名
  SELECT last_name FROM employees WHERE last_name LIKE '_\_%';
  ```

  **2、between and**

  ```sql
  #案例1:查询员工编号在100到120之间的员工信息
  SELECT * FROM employees WHERE employee_id>=100 AND employee_id<=120;
  
  SELECT * FROM employees WHERE employee_id BETWEEN 100 AND 120;
  
  /*注意事项：
  1.提高语句简洁度
  2.包含临界值
  3.两个临界值不能调换顺序
  */
  ```

  **3、in**

  ```sql
  /*
  含义:判断某字段的值是否属于in列表中的某一项
  特点:
   1.使用in提高语句简洁度
   2.in列表的值类型必须一致或兼容
  */
  #案例1:查询员工的工种编号是IT_PROG、AD_VP、AD_PRES中的一个员工名和工种编号
  
  SELECT last_name,job_id FROM employees WHERE job_id='IT_PROG' OR job_id='AD_PRES' OR job_id='AD_VP';
  
  SELECT last_name,job_id FROM employees WHERE job_id IN('IT_PROG','AD_PRES','AD_VP');
  ```

  **4、is null 和  is not null**

  ```sql
  /*
  =或<>不能用于判断null值
  is null 或 is not null 可以判断null值
  */
  #案例1:查询没有奖金的员工名和奖金率
  
  SELECT last_name,commission_pct FROM employees WHERE commission_pct IS NULL;
  
  SELECT last_name,commission_pct FROM employees WHERE commission_pct IS NOT NULL;
  ```

  **5、完全等于<=>**

  ```sql
  #案例1:查询没有奖金的员工名和奖金率
  
  SELECT last_name,commission_pct FROM employees WHERE commission_pct <=> NULL;
  
  #案例2:查询工资为12000的员工信息
  SELECT last_name,commission_pct FROM employees WHERE salary <=> 12000;
  
  ```

  **6、is null PK <=>**

  ```sql
  #is null PK <=>
  #	      普通类型的数值	null值		可读性
  # is null	  ×		       √		   √
  # <=>		  √		       √		   ×
  ```

  

## 三、排序查询

- **引入**：select * from employees;

- **语法**：select 查询列表 from 表 【where 筛选条件】 order by

- **特点**：

  （1）asc代表的是升序，desc代表降序，不写默认为升序

  （2）order by子句中可以支持单个字段、多个字段、表达式、函数、别名

  （3）order by子句一般是放在查询语句的最后面,limit子句除外

- **案例**

  ```mysql
  #案例1:查询员工信息,要求工资从高到低排序
  SELECT * FROM employees ORDER BY salary DESC;
  SELECT * FROM employees ORDER BY salary;
  
  #案例2:查询部门编号是>=90，按入职时间的先后进行排序
  SELECT * FROM employees WHERE department_id>=90 ORDER BY hiredate ASC;
  
  #案例3:按年薪的高低显示员工的信息和年薪【按表达式排序】
  SELECT *,salary*12*(1+IFNULL(commission_pct,0)) 年薪 FROM employees 
  ORDER BY salary*12*(1+IFNULL(commission_pct,0)) DESC; 
  
  #案例4:按年薪的高低显示员工的信息和年薪【按别名排序】
  SELECT *,salary*12*(1+IFNULL(commission_pct,0)) 年薪 FROM employees 
  ORDER BY 年薪 DESC; 
  
  #案例5:按姓名的长度显示员工的姓名和工资【按函数排序】
  SELECT LENGTH(last_name) 字节长度,last_name,salary
  FROM employees
  ORDER BY LENGTH(last_name) DESC;
  
  #案例6:查询员工共信息,要求按工资排序，再按员工编号排序【按多个字段排序】
  SELECT * FROM employees
  ORDER BY salary ASC,employee_id DESC;
  
  ```

  

## 四、常见函数

- **概念**：类似于Java的方法，将一组逻辑语句封装在方法体中，对外暴露方法名

- **优点**：

  （1）隐藏了实现细节 

  （2）提高了代码的重用性

- **语法**：select 函数名(实参列表) 【from 表】;

- **特点**：

  （1）叫什么(函数名)

  （2）干什么(函数功能)

- **分类**:

  （1）单行函数，如concat、length、ifnull等

  （2）分组函数，做统计使用



### （一）单行函数

单行函数分类：字符函数、数学函数、日期函数、其他函数、流程控制函数

==1、字符函数==

concat：连接

substr：截取子串

upper：变大写

lower：变小写

replace：替换

length：获取字节长度

trim：去前后空格

lpad：左填充

rpad：右填充

instr：获取子串第一次出现的索引

```sql
#一.字符函数
#1.length 获取参数值的字节值
SELECT LENGTH('subei');
SELECT LENGTH('鬼谷子qwe');

SHOW VARIABLES LIKE '%char%';

#2.concat 拼接字符串
SELECT CONCAT(last_name,'_',first_name) 姓名 FROM employees;

#3.upper:变大写、lower：变小写

SELECT UPPER('ton');
SELECT LOWER('ton');

#示例：将姓变大写，名变小写，然后拼接
SELECT CONCAT(UPPER(last_name),' ', LOWER(first_name)) 姓名 FROM employees;


#4.substr、substring
#注意:索引从1开始

#截取从指定所有处后面的所以字符
SELECT SUBSTR('吴刚伐桂在天上',4) out_put;

#截取从指定索引处指定字符长度的字符
SELECT SUBSTR('吴刚伐桂在天上',1,2) out_put;

#案例:姓名中首字符大写,其他字符小写，然后用_拼接,显示出来
SELECT CONCAT(UPPER(SUBSTR(last_name,1,1)),'_',LOWER(SUBSTR(last_name,2))) out_put FROM employees;

#5.instr:获取子串第一次出现的索引,找不到返回0
SELECT INSTR('MySQL技术进阶','技术') AS out_put;

#6.trim:去前后空格

SELECT LENGTH(TRIM('	霍山	')) AS out_put;

SELECT TRIM('+' FROM '++++李刚+++刘邦+++') AS out_put;

#7.lpad:用指定的字符实现左填充指定长度
SELECT LPAD('梅林',8,'+') AS out_put;

#8.rpad:用指定的字符实现右填充指定长度
SELECT RPAD('梅林',5,'&') AS out_put;

#9.replace:替换
SELECT REPLACE('莉莉伊万斯的青梅竹马是詹姆','詹姆','斯内普') AS out_put;
```

==2、数学函数==

```sql
#1.round:四舍五入
SELECT ROUND(1.45);
SELECT ROUND(1.567,2);

#2.ceil:向上取整,返回>=该参数的最小整数
SELECT CEIL(1.005);
SELECT CEIL(-1.002);

#3.floor:向下取整,返回<=该参数的最大整数
SELECT FLOOR(-9.99);

#4.truncate:截断，第二个参数指定截取的小数位数
SELECT TRUNCATE(1.65,1);

#5.mod:取余
SELECT MOD(10,3);

#6.rand:获取随机数，返回0-1之间的小数
SELECT RAND();
```

==3、日期函数==

```sql
#1.now:返回当前系统时间+日期
SELECT NOW();

#2.year:返回年
SELECT YEAR(NOW());
SELECT YEAR(hiredate) 年 FROM employees;

#3.month:返回月
#MONTHNAME:以英文形式返回月
SELECT MONTH(NOW());
SELECT MONTHNAME(NOW());

#4.day:返回日
#DATEDIFF:返回两个日期相差的天数
SELECT DAY(NOW());
SELECT DATEDIFF('2020/06/30','2020/06/21');

#5.str_to_date:将字符通过指定格式转换成日期
SELECT STR_TO_DATE('2020-5-13','%Y-%c-%d') AS out_put;

#6.date_format:将日期转换成字符
SELECT DATE_FORMAT('2020/6/6','%Y年%m月%d日') AS out_put;
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日') AS out_put;

#7.curdate:返回当前日期
SELECT CURDATE();

#8.curtime:返回当前时间
SELECT CURTIME();
```

==4、其他函数==

```sql
#version 当前数据库服务器的版本
SELECT VERSION();

#database 当前打开的数据库
SELECT DATABASE();

#user当前用户
SELECT USER();

#password('字符')：返回该字符的密码形式
SELECT PASSWORD('a');

#md5('字符'):返回该字符的md5加密形式
SELECT MD5('a');
```

==5、流程控制函数==

```sql
#1.if函数: if else效果

SELECT IF(10<5,'大','小');

SELECT last_name,commission_pct,IF(commission_pct IS NULL,'没奖金！！！','有奖金!!!') 备注 FROM employees;

#2.case函数
#使用一:switch case 的效果
/*
java中
switch(变量或表达式){
	case 常量1:语句1;break;
	...
	default:语句n;break;
}

mysql中

case 要判断的变量或表达式
when 常量1 then 要显示的值1或语句1
when 常量2 then 要显示的值2或语句2
...
else 要显示的值n或语句n
end

#案例:查询员工的工资,要求:

部门号=30,显示的工资为1.1倍
部门号=40,显示的工资为1.2倍
部门号=50,显示的工资为1.3倍
其他部门,显示的工资为原工资

*/

SELECT salary 原始工资,department_id,
CASE department_id
WHEN 30 THEN salary*1.1
WHEN 40 THEN salary*1.2
WHEN 50 THEN salary*1.3
ELSE salary
END AS 新工资
FROM employees;

#3.case函数的使用二:类似于多重if
/*
java中:
if(条件1){
	语句1;
}else if(条件2){
	语句2;
}
...
else{
	语句n;
}	

mysql中:
case 
when 条件1 then 要显示的值1或语句1
when 条件2 then 要显示的值2或语句2
...
else 要显示的值n或语句n
end

*/

#案例:查询员工的工资的情况
/*
如果工资>20000，显示A级别
如果工资>15000，显示B级别
如果工资>10000，显示c级别
否则，显示D级别
*/

SELECT salary,
CASE
WHEN salary>20000 THEN 'A'
WHEN salary>15000 THEN 'B'
WHEN salary>10000 THEN 'C'
ELSE 'D'
END AS 工资等级
FROM employees;

```

### （二）分组函数

- **功能**：用作统计使用，又称为聚合函数或统计函数或组函数

- **分类**：sum 求和、avg 平均值、max 最大值、min最小值count 计算个数

- **特点**：

  （1）sum和avg一般用于处理数值型max、min、count可以处理任何数据类型

  （2）以上分组函数都忽略null

  （3）都可以搭配distinct使用，实现去重的统计select sum(distinct 字段) from 表;

  （4）count函数
  		  count(字段)：统计该字段非空值的个数
            count(*):统计结果集的行数

  （5）和分组函数一同查询的字段，要求是group by后出现的字段

```sql
#1.简单使用
SELECT SUM(salary) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT MAX(salary) FROM employees;
SELECT MIN(salary) FROM employees;
SELECT COUNT(salary) FROM employees;

SELECT SUM(salary) 和,ROUND(AVG(salary),2) 平均,MAX(salary) 最高,MIN(salary) 最低,COUNT(salary) 个数
FROM employees;

#2.参数支持哪些数据类型

SELECT SUM(last_name),AVG(last_name) FROM employees;
SELECT SUM(hiredate),AVG(hiredate) FROM employees;

SELECT MAX(last_name),MIN(last_name) FROM employees;
SELECT MAX(hiredate),MIN(hiredate) FROM employees;

SELECT COUNT(commission_pct) FROM employees;
SELECT COUNT(last_name) FROM employees;

#3.是否忽略null
--sum、avg、max、min忽略null
SELECT SUM(commission_pct),AVG(commission_pct) FROM employees;

SELECT commission_pct FROM employees;

SELECT SUM(commission_pct),AVG(commission_pct),SUM(commission_pct)/35,AVG(commission_pct)/107 FROM employees;

SELECT MAX(commission_pct),MIN(commission_pct) FROM employees; 

-- count(*)统计所有记录
-- count(column)统计非null值的记录
SELECT COUNT(*) FROM employees; 
SELECT COUNT(commission_pct) FROM employees; 
SELECT COUNT(*) FROM employees WHERE commission_pct IS NOT NULL; 

#4.和distinct搭配

SELECT SUM(DISTINCT salary),SUM(salary) FROM employees;

SELECT COUNT(DISTINCT salary),COUNT(salary) FROM employees;

#5.count函数详解

SELECT COUNT(salary) FROM employees;
SELECT COUNT(*) FROM employees;
SELECT COUNT(1) FROM employees;
/*
效率上：
MyISAM存储引擎，count(*)最高
InnoDB存储引擎，count(*)和count(1)效率>count(字段)
*/

#6.和分组函数一同查询的字段有限制

SELECT AVG(salary),employee_id FROM employees;

```

大部分运算会忽略NULL行，个别有例外（如聚合、排序）。

具体见下表：

函数	NULL值处理

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| count          | count(*)统计所有符合条件的行<br /> count(column)忽略列值为NULL的行<br /> count(NULL)为0 |
| max            | 忽略列值为NULL的行                                           |
| min            | 忽略列值为NULL的行                                           |
| sum            | 忽略列值为NULL的行                                           |
| avg            | 忽略列值为NULL的行                                           |
| group by       | NULL作为一项，放在首行                                       |
| order by       | 所有NULL值相等，作为最小项                                   |
| distinct       | 所有NULL值相等                                               |
| +              | +直接运算，任意一项值为NULL，则结果为NULL                    |
| <、><br/>=、<> | 论值为什么，结果为`NULL`；若要与`NULL`比较是否相等，需使用`is null`或`is not null` |

::: tip

如果就是要统计NULL行，可以利用`if`求和解决：`sum(if(column is null, 1, 0))`

效率上：

- MyISAM存储引擎，`count(*)`最高
- InnoDB存储引擎，`count(*)`和`count(1)`效率>count(字段)

:::



## 五、分组查询

- **语法**

  ```sql
  select 分组函数,分组后的字段
  from 表
  【where 筛选条件】
  group by 分组的字段
  【having 分组后的筛选】
  【order by 排序列表】
  ```

  ::: tip 注意

  查询列表必须特殊,要求是分组函数和group by后出现的字段

  :::

- **特点**

  （1）分组查询中的筛选条件分为两类

  ```sql
  			使用关键字	筛选的表	位置
  分组前筛选	where		原始表		group by的前面
  分组后筛选	having		分组后的结果	group by的后面
  1.分组函数做条件肯定是放在having子句中
  2.能用分组前筛选的，就优先考虑使用分组前筛选
  
  ```

  （2）group by子句支持单个字段分组，多个字段分组(多个字段之间用逗号隔开没有顺序要求),表达式或函数(使用较少)

  （3）也可以添加排序(排序放在整个分组查询的最后)

- **案例**

  ```sql
  #引入:查询每个部门的平均工资
  SELECT e.department_id,AVG(e.salary) 平均薪资 FROM employees e GROUP BY e.department_id ORDER BY 平均薪资;
  -- 复杂一点使用内连接，根据部门ID显示部门名称
  SELECT d.department_name 部门,AVG(e.salary) 平均薪资 FROM employees e INNER JOIN departments d ON e.department_id=d.department_id GROUP BY d.department_name ORDER BY 平均薪资;
  
  #案例1:查询每个工种的最高工资
  SELECT MAX(salary),job_id FROM employees 
  GROUP BY job_id;
  
  
  #案例2:查询每个位置上的部门个数
  SELECT COUNT(*),location_id
  FROM departments
  GROUP BY location_id;
  
  #添加筛选条件
  #案例1:查询邮箱中包含a字符的，每个部门的平均工资
  SELECT AVG(salary),department_id FROM employees
  WHERE email LIKE '%a%' GROUP BY department_id;
  
  #案例2:查询有奖金的每个领导手下员工的最高工资
  SELECT MAX(salary),manager_id FROM employees
  WHERE commission_pct IS NOT NULL
  GROUP BY manager_id;
  
  #添加复杂的筛选条件
  #案例1:查询哪个部门的员工个数>2
  #1.查询每个部门的员工个数
  SELECT COUNT(*),department_id FROM employees
  GROUP BY department_id;
  
  #2.根据1的结果进行筛选，查询哪个部门的员工个数大于2
  SELECT COUNT(*),department_id FROM employees
  GROUP BY department_id HAVING COUNT(*)>2;
  
  
  #案例2:查询每个工种有奖金的员工的最高工资>12000的工种编号和最高工资 
  #1.查询每个工种有奖金的员工的最高工资 
  SELECT MAX(salary),job_id FROM employees 
  WHERE commission_pct IS NOT NULL GROUP BY job_id; 
  
  #2.根据结果继续筛选，最高工资>12000 
  
  SELECT MAX(salary), job_id FROM employees 
  WHERE commission_pct IS NOT NULL GROUP BY job_id 
  HAVING MAX(salary)>12000; 
  
  #按表达式或函数分组
  
  #案例:按员工姓名的长度分组,查询每一组的员工个数,筛选员工个数>5
  
  #1.查询每个长度的员工个数 
  SELECT COUNT(*),LENGTH(last_name) len_name 
  FROM employees GROUP BY LENGTH(last_name); 
  
  #2.添加筛选条件
  SELECT COUNT(*) c,LENGTH(last_name) len_name 
  FROM employees GROUP BY len_name HAVING c>5;
  
  #按多个字段查询
  #案例:查询每个部门每个工种的员工的平均工资
  
  SELECT AVG(salary),department_id,job_id
  FROM employees GROUP BY department_id,job_id;
  
  #添加排序
  #案例:查询每个部门每个工种的员工的平均工资,按平均工资的高低查询
  
  SELECT AVG(salary),department_id,job_id
  FROM employees GROUP BY department_id,job_id
  ORDER BY AVG(salary) DESC;
  
  
  ```

  

## 六、连接查询

- **含义**：又称多表查询,当查询的数据来自多个表时,就会用到连接查询

- **笛卡尔乘积现象**：表1 有m行，表2有n行，结果=m*n行

- **发生原因**：没有有效的连接条件

- **如何避免**：添加有效的连接条件

- **分类**

  ```tex
  按年代分类：
  	sql92标准:仅仅支持内连接
  	sql99标准【推荐】：支持内连接+外连接（左外和右外）+交叉连接
  	
  按功能分类：
  	内连接：
  		等值连接
  		非等值连接
  		自连接
  	外连接：
  		左外连接
  		右外连接
  		全外连接
  	交叉连接
  ```

  

### （一）sql92标准案例

**1、等值连接**

```sql
#1、等值连接

/*
1.多表等值连接的结果为多表的交集部分
2.n表连接，至少需要n-1个连接条件
3.多表的顺序没有要求
4.一般需要为表起别名
5.可以搭配前面介绍的所有子句使用，比如排序、分组、筛选
*/

#案例1：查询女神名和对应的男神名
SELECT NAME,boyName FROM boys,beauty
WHERE beauty.boyfriend_id= boys.id;

#案例2：查询员工名和对应的部门名

SELECT last_name,department_name 
FROM employees,departments
WHERE employees.`department_id`=departments.`department_id`;

#2、为表起别名
/*
1.提高语句的简洁度
2.区分多个重名的字段

注意：如果为表起了别名，则查询的字段就不能使用原来的表名去限定
*/
#查询员工名、工种号、工种名
SELECT e.last_name,e.job_id,j.job_title
FROM employees  e,jobs j
WHERE e.`job_id`=j.`job_id`;

#3、两个表的顺序是否可以调换
#查询员工名、工种号、工种名

SELECT e.last_name,e.job_id,j.job_title
FROM jobs j,employees e
WHERE e.`job_id`=j.`job_id`;
-- 可以调换

#4、可以加筛选
#案例：查询有奖金的员工名、部门名

SELECT last_name,department_name,commission_pct
FROM employees e,departments d
WHERE e.`department_id`=d.`department_id`
AND e.`commission_pct` IS NOT NULL;

#案例2：查询城市名中第二个字符为o的部门名和城市名

SELECT department_name,city
FROM departments d,locations l
WHERE d.`location_id` = l.`location_id`
AND city LIKE '_o%';

#5、可以加分组
#案例1：查询每个城市的部门个数

SELECT COUNT(*) 个数,city
FROM departments d,locations l
WHERE d.`location_id`=l.`location_id`
GROUP BY city;

#案例2：查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
SELECT department_name,d.`manager_id`,MIN(salary)
FROM departments d,employees e
WHERE d.`department_id`=e.`department_id`
AND commission_pct IS NOT NULL
GROUP BY department_name;

#6、可以加排序
#案例：查询每个工种的工种名和员工的个数，并且按员工个数降序

SELECT job_title,COUNT(*)
FROM employees e,jobs j
WHERE e.`job_id`=j.`job_id`
GROUP BY job_title
ORDER BY COUNT(*) DESC;

#7、可以实现三表连接？
#案例：查询员工名、部门名和所在的城市

SELECT last_name,department_name,city
FROM employees e,departments d,locations l
WHERE e.`department_id`=d.`department_id`
AND d.`location_id`=l.`location_id`
AND city LIKE 's%'
ORDER BY department_name DESC;

```

**2、非等值连接**

```sql
#2、非等值连接
#案例1：查询员工的工资和工资级别

SELECT salary,grade_level
FROM employees e,job_grades g
WHERE salary BETWEEN g.`lowest_sal` AND g.`highest_sal`
AND g.`grade_level`='A';

/*
select salary,employee_id from employees;
select * from job_grades;
CREATE TABLE job_grades
(grade_level VARCHAR(3),
 lowest_sal  int,
 highest_sal int);

INSERT INTO job_grades
VALUES ('A', 1000, 2999);

INSERT INTO job_grades
VALUES ('B', 3000, 5999);

INSERT INTO job_grades
VALUES('C', 6000, 9999);

INSERT INTO job_grades
VALUES('D', 10000, 14999);

INSERT INTO job_grades
VALUES('E', 15000, 24999);

INSERT INTO job_grades
VALUES('F', 25000, 40000);

*/
```

**3、自连接**

```sql
#3、自连接
#案例：查询 员工名和上级的名称
SELECT e.employee_id,e.last_name,m.employee_id,m.last_name
FROM employees e,employees m
WHERE e.`manager_id`=m.`employee_id`;
```



### （二）sql99标准案例

- **语法**

  ```sql
  select 查询列表
  from 表1 别名 【连接类型】
  join 表2 别名 
  on 连接条件
  【where 筛选条件】
  【group by 分组】
  【having 筛选条件】
  【order by 排序列表】
  ```

- **分类**

  ```sql
  内连接（★）：inner
  外连接
  	左外(★):left 【outer】
  	右外(★)：right 【outer】
  	全外：full【outer】
  交叉连接：cross 
  ```

- **案例**

  ```sql
  #一、内连接
  /*
  语法：
  
  select 查询列表
  from 表1 别名
  inner join 表2 别名
  on 连接条件;
  
  分类：
  等值
  非等值
  自连接
  
  特点：
  ①添加排序、分组、筛选
  ②inner可以省略
  ③ 筛选条件放在where后面，连接条件放在on后面，提高分离性，便于阅读
  ④inner join连接和sql92语法中的等值连接效果是一样的，都是查询多表的交集
  
  */
  
  #1、等值连接
  #案例1.查询员工名、部门名
  
  SELECT last_name,department_name FROM departments d
  INNER JOIN  employees e
  ON e.`department_id` = d.`department_id`;
  
  #案例2.查询名字中包含e的员工名和工种名（添加筛选）
  SELECT last_name,job_title FROM employees e
  INNER JOIN jobs j ON e.`job_id`=  j.`job_id`
  WHERE e.`last_name` LIKE '%e%';
  
  #案例3.查询部门个数>3的城市名和部门个数，（添加分组+筛选）
  
  #1.查询每个城市的部门个数
  #2.在1结果上筛选满足条件的
  SELECT city,COUNT(*) 部门个数
  FROM departments d
  INNER JOIN locations l
  ON d.`location_id`=l.`location_id`
  GROUP BY city
  HAVING COUNT(*)>3;
  
  #案例4.查询哪个部门的员工个数>3的部门名和员工个数，并按个数降序（添加排序）
  
  #1.查询每个部门的员工个数
  SELECT COUNT(*),department_name
  FROM employees e
  INNER JOIN departments d
  ON e.`department_id`=d.`department_id`
  GROUP BY department_name;
  
  #2.在1结果上筛选员工个数>3的记录，并排序
  
  SELECT COUNT(*) 个数,department_name
  FROM employees e
  INNER JOIN departments d
  ON e.`department_id`=d.`department_id`
  GROUP BY department_name
  HAVING COUNT(*)>3
  ORDER BY COUNT(*) DESC;
  
  #案例5.查询员工名、部门名、工种名，并按部门名降序（添加三表连接）
  
  SELECT last_name,department_name,job_title
  FROM employees e
  INNER JOIN departments d ON e.`department_id`=d.`department_id`
  INNER JOIN jobs j ON e.`job_id` = j.`job_id`
  ORDER BY department_name DESC;
  
  #二、非等值连接
  
  #查询员工的工资级别
  
  SELECT salary,grade_level
  FROM employees e
  JOIN job_grades g
  ON e.`salary` BETWEEN g.`lowest_sal` AND g.`highest_sal`;
   
  #查询工资级别的个数>20的个数，并且按工资级别降序
  SELECT COUNT(*),grade_level
  FROM employees e
  JOIN job_grades g
  ON e.`salary` BETWEEN g.`lowest_sal` AND g.`highest_sal`
  GROUP BY grade_level
  HAVING COUNT(*)>20
  ORDER BY grade_level DESC;
  
  #三、自连接
   
  #查询员工的名字、上级的名字
  SELECT e.last_name,m.last_name
  FROM employees e
  JOIN employees m
  ON e.`manager_id`= m.`employee_id`;
   
  #查询姓名中包含字符k的员工的名字、上级的名字
  SELECT e.last_name,m.last_name
  FROM employees e
  JOIN employees m
  ON e.`manager_id`= m.`employee_id`
  WHERE e.`last_name` LIKE '%k%';
  
  #二、外连接
   
  /*
  应用场景：用于查询一个表中有，另一个表没有的记录
   
  特点：
  1、外连接的查询结果为主表中的所有记录
  	如果从表中有和它匹配的，则显示匹配的值
  	如果从表中没有和它匹配的，则显示null
  	外连接查询结果=内连接结果+主表中有而从表没有的记录
  2、左外连接，left join左边的是主表
     右外连接，right join右边的是主表
  3、左外和右外交换两个表的顺序，可以实现同样的效果 
  4、全外连接=内连接的结果+表1中有但表2没有的+表2中有但表1没有的
  */
  #引入：查询男朋友 不在男神表的的女神名
  
  SELECT * FROM beauty;
  SELECT * FROM boys;
   
  #左外连接
  SELECT b.*,bo.* FROM boys bo
  LEFT OUTER JOIN beauty b
  ON b.`boyfriend_id` = bo.`id`
  WHERE b.`id` IS NULL;
   
  #案例1：查询哪个部门没有员工
  #左外
  SELECT d.*,e.employee_id
  FROM departments d
  LEFT OUTER JOIN employees e
  ON d.`department_id` = e.`department_id`
  WHERE e.`employee_id` IS NULL;
  
  #右外
   
  SELECT d.*,e.employee_id
  FROM employees e
  RIGHT OUTER JOIN departments d
  ON d.`department_id` = e.`department_id`
  WHERE e.`employee_id` IS NULL;
  
  #全外
  
  USE girls;
  SELECT b.*,bo.* FROM beauty b
  FULL OUTER JOIN boys bo
  ON b.`boyfriend_id` = bo.id;
  
  #交叉连接
  -- 两个表各10条记录，交叉连接就是返回10*10条记录
  -- 可以想象，当表中的数据较多时，得到的运行结果会非常长，而且得到的运行结果也没太大的意义。
  -- 所以，通过交叉连接的方式进行多表查询的这种方法并不常用，我们应该尽量避免这种查询。
  SELECT * FROM beauty b
  CROSS JOIN boys bo;
  ```

  

### （三）sql92和sql99对比

- **功能**：sql99支持的较多
- **可读性**：sql99实现连接条件和筛选条件的分离，可读性较高



## 七、子查询

- **含义**：出现在其他语句中的select语句,称为子查询或内查询外部的查询语句，称为主查询或外查询。
- **分类**

- **案例**

  ```sql
  #一、where或having后面
  /*
  1、标量子查询（单行子查询）
  2、列子查询（多行子查询）
  3、行子查询（多列多行）
  
  特点：
  ①子查询放在小括号内
  ②子查询一般放在条件的右侧
  ③标量子查询，一般搭配着单行操作符使用
  > < >= <= = <>
  
  列子查询，一般搭配着多行操作符使用
  in、any/some、all
  
  ④子查询的执行优先于主查询执行，主查询的条件用到了子查询的结果
  */
  
  #1.标量子查询★
  
  #案例1：谁的工资比 Abel 高?
  
  #①查询Abel的工资
  SELECT salary
  FROM employees
  WHERE last_name = 'Abel';
  
  #②查询员工的信息，满足 salary>①结果
  SELECT *
  FROM employees
  WHERE salary>(
  	SELECT salary
  	FROM employees
  	WHERE last_name = 'Abel'
  	
  );
  
  #案例2：返回job_id与141号员工相同，salary比143号员工多的员工 姓名，job_id 和工资
  
  #①查询141号员工的job_id
  SELECT job_id FROM employees
  WHERE employee_id = 141;
  
  #②查询143号员工的salary
  SELECT salary FROM employees
  WHERE employee_id = 143;
  
  #③查询员工的姓名，job_id 和工资，要求job_id=①并且salary>②
  
  SELECT last_name,job_id,salary
  FROM employees
  WHERE job_id = (
  	SELECT job_id
  	FROM employees
  	WHERE employee_id = 141
  ) AND salary>(
  	SELECT salary
  	FROM employees
  	WHERE employee_id = 143
  
  );
  
  #案例3：返回公司工资最少的员工的last_name,job_id和salary
  
  #①查询公司的最低工资
  SELECT MIN(salary) FROM employees;
  
  #②查询last_name,job_id和salary，要求salary=①
  SELECT last_name,job_id,salary
  FROM employees
  WHERE salary=(
  	SELECT MIN(salary)
  	FROM employees
  );
  
  #案例4：查询最低工资大于50号部门最低工资的部门id和其最低工资
  
  #①查询50号部门的最低工资
  SELECT  MIN(salary)
  FROM employees
  WHERE department_id = 50;
  
  #②查询每个部门的最低工资
  
  SELECT MIN(salary),department_id
  FROM employees
  GROUP BY department_id;
  
  #③ 在②基础上筛选，满足min(salary)>①
  SELECT MIN(salary),department_id
  FROM employees
  GROUP BY department_id
  HAVING MIN(salary)>(
  	SELECT  MIN(salary)
  	FROM employees
  	WHERE department_id = 50
  );
  
  #非法使用标量子查询
  
  SELECT MIN(salary),department_id
  FROM employees
  GROUP BY department_id
  HAVING MIN(salary)>(
  	SELECT  salary
  	FROM employees
  	WHERE department_id = 250
  );
  
  #2.列子查询（多行子查询）★
  #案例1：返回location_id是1400或1700的部门中的所有员工姓名
  
  #①查询location_id是1400或1700的部门编号
  SELECT DISTINCT department_id
  FROM departments
  WHERE location_id IN(1400,1700);
  
  #②查询员工姓名，要求部门号是①列表中的某一个
  
  SELECT last_name
  FROM employees
  WHERE department_id  <>ALL(
  	SELECT DISTINCT department_id
  	FROM departments
  	WHERE location_id IN(1400,1700)
  );
  
  
  #案例2：返回其它工种中比job_id为‘IT_PROG’工种任一工资低的员工的员工号、姓名、job_id 以及salary
  
  #①查询job_id为‘IT_PROG’部门任一工资
  
  SELECT DISTINCT salary FROM employees
  WHERE job_id = 'IT_PROG';
  
  #②查询员工号、姓名、job_id 以及salary，salary<(①)的任意一个
  SELECT last_name,employee_id,job_id,salary
  FROM employees
  WHERE salary<ANY(
  	SELECT DISTINCT salary
  	FROM employees
  	WHERE job_id = 'IT_PROG'
  
  ) AND job_id<>'IT_PROG';
  
  #或
  SELECT last_name,employee_id,job_id,salary
  FROM employees
  WHERE salary<(
  	SELECT MAX(salary)
  	FROM employees
  	WHERE job_id = 'IT_PROG'
  
  ) AND job_id<>'IT_PROG';
  
  
  #案例3：返回其它部门中比job_id为‘IT_PROG’部门所有工资都低的员工   的员工号、姓名、job_id 以及salary
  
  SELECT last_name,employee_id,job_id,salary
  FROM employees
  WHERE salary<ALL(
  	SELECT DISTINCT salary
  	FROM employees
  	WHERE job_id = 'IT_PROG'
  
  ) AND job_id<>'IT_PROG';
  
  #或
  
  SELECT last_name,employee_id,job_id,salary
  FROM employees
  WHERE salary<(
  	SELECT MIN( salary)
  	FROM employees
  	WHERE job_id = 'IT_PROG'
  
  ) AND job_id<>'IT_PROG';
  
  #3、行子查询（结果集一行多列或多行多列）
  
  #案例：查询员工编号最小并且工资最高的员工信息
  
  SELECT * FROM employees
  WHERE (employee_id,salary)=(
  	SELECT MIN(employee_id),MAX(salary)
  	FROM employees
  );
  
  #①查询最小的员工编号
  SELECT MIN(employee_id) FROM employees;
  
  #②查询最高工资
  SELECT MAX(salary) FROM employees;
  
  #③查询员工信息
  SELECT * FROM employees
  WHERE employee_id=(
  	SELECT MIN(employee_id)
  	FROM employees
  )AND salary=(
  	SELECT MAX(salary)
  	FROM employees
  );
  
  
  #二、select后面
  /*
  仅仅支持标量子查询
  */
  
  #案例：查询每个部门的员工个数
  
  SELECT d.*,(
  	SELECT COUNT(*)
  	FROM employees e
  	WHERE e.department_id = d.`department_id`
   ) 个数
   FROM departments d;
   
   
  #案例2：查询员工号=102的部门名
   
  SELECT (
  	SELECT department_name,e.department_id
  	FROM departments d
  	INNER JOIN employees e
  	ON d.department_id=e.department_id
  	WHERE e.employee_id=102
  	
  ) 部门名;
  
  #三、from后面
  /*
  将子查询结果充当一张表，要求必须起别名
  */
  
  #案例：查询每个部门的平均工资的工资等级
  #①查询每个部门的平均工资
  SELECT AVG(salary),department_id
  FROM employees GROUP BY department_id;
  
  SELECT * FROM job_grades;
  
  #②连接①的结果集和job_grades表，筛选条件平均工资 between lowest_sal and highest_sal
  
  SELECT  ag_dep.*,g.`grade_level`
  FROM (
  	SELECT AVG(salary) ag,department_id
  	FROM employees
  	GROUP BY department_id
  ) ag_dep
  INNER JOIN job_grades g
  ON ag_dep.ag BETWEEN lowest_sal AND highest_sal;
  
  #四、exists后面（相关子查询）
  /*
  语法：
  exists(完整的查询语句)
  结果：
  1或0
  */
  SELECT EXISTS(SELECT employee_id FROM employees WHERE salary=300000);
  
  #案例1：查询有员工的部门名
  
  #in
  SELECT department_name
  FROM departments d
  WHERE d.`department_id` IN(
  	SELECT department_id
  	FROM employees
  );
  
  #exists
  SELECT department_name
  FROM departments d
  WHERE EXISTS(
  	SELECT *
  	FROM employees e
  	WHERE d.`department_id`=e.`department_id`
  );
  
  #案例2：查询没有女朋友的男神信息
  
  #in
  SELECT bo.*
  FROM boys bo
  WHERE bo.id NOT IN(
  	SELECT boyfriend_id
  	FROM beauty
  );
  
  #exists
  SELECT bo.*
  FROM boys bo
  WHERE NOT EXISTS(
  	SELECT boyfriend_id
  	FROM beauty b
  	WHERE bo.`id`=b.`boyfriend_id`
  );
  ```

  

## 八、分页查询

- **应用场景**：当要显示的数据，一页显示不全，需要分页提交sql请求。

- **语法**

  ```sql
  select 查询列表
  from 表1
  【join type】 join 表2
  on 连接条件
  where 筛选条件
  group by 分组字段
  having 分组后的筛选
  order by 排序的字段】
  limit 【offset,】size;
  
  --注意：
  	offset要显示条目的起始索引（起始索引从0开始）
  	size 要显示的条目个数
  ```

- **特点**

  ```sql
  ①limit语句放在查询语句的最后
  ②公式
  	要显示的页数 page，每页的条目数size
  	
  select 查询列表 from 表
  limit (page-1)*size,size;
  	
  size=10
  page  
  1	0
  2  	10
  3	20
  ```

- **案例**

  ```sql
  #案例1：查询前五条员工信息
  SELECT * FROM  employees LIMIT 0,5;
  SELECT * FROM  employees LIMIT 5;
  
  #案例2：查询第11条——第25条
  SELECT * FROM employees LIMIT 10,15;
  
  #案例3：有奖金的员工信息，并且工资较高的前10名显示出来
  SELECT * FROM employees 
  WHERE commission_pct IS NOT NULL 
  ORDER BY salary DESC LIMIT 10 ;
  ```

  

## 九、联合查询

- **含义**：union (联合、合并)：将多条查询语句的结果合并成一个结果。

- **语法**

  ```sql
  查询语句1
  union 【all】
  查询语句2
  union 【all】
  ...
  ```

- **意义**

  （1）将一条比较复杂的查询语句拆分成多条语句

  （2）适用于查询多个表的时候，查询的列基本是一致。

- **特点**

  （1）要求多条查询语句的查询列数是一致的！

  （2）要求多条查询语句的查询的每一列的类型和顺序最好一致

  （3）union关键字默认去重，如果使用union all 可以包含重复项

- **案例**

  ```sql
  #引入的案例：查询部门编号>90或邮箱包含a的员工信息
  
  SELECT * FROM employees WHERE email LIKE '%a%' OR department_id>90;
  
  SELECT * FROM employees  WHERE email LIKE '%a%'
  UNION
  SELECT * FROM employees  WHERE department_id>90;
  
  
  #案例：查询中国用户中男性的信息以及外国用户中年男性的用户信息
  
  SELECT id,cname,csex FROM t_ca WHERE csex='男'
  UNION
  SELECT t_id,tName,tGender FROM t_ua WHERE tGender='male';
  ```

- **此处需要的数据库源文件**

  ```sql
  /*
   Navicat MySQL Data Transfer
  
   Source Server         : localhost
   Source Server Type    : MySQL
   Source Server Version : 50145
   Source Host           : localhost:3306
   Source Schema         : test
  
   Target Server Type    : MySQL
   Target Server Version : 50145
   File Encoding         : 65001
  
   Date: 03/07/2020 11:08:32
  */
  
  SET NAMES utf8mb4;
  SET FOREIGN_KEY_CHECKS = 0;
  
  -- ----------------------------
  -- Table structure for t_ca
  -- ----------------------------
  DROP TABLE IF EXISTS `t_ca`;
  CREATE TABLE `t_ca`  (
    `id` int(20) NOT NULL,
    `cname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `csex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
  
  -- ----------------------------
  -- Records of t_ca
  -- ----------------------------
  INSERT INTO `t_ca` VALUES (1, '韩梅梅', '女');
  INSERT INTO `t_ca` VALUES (2, '李雷', '男');
  INSERT INTO `t_ca` VALUES (3, '李明', '男');
  
  SET FOREIGN_KEY_CHECKS = 1;
  
  
  /*
   Navicat MySQL Data Transfer
  
   Source Server         : localhost
   Source Server Type    : MySQL
   Source Server Version : 50145
   Source Host           : localhost:3306
   Source Schema         : test
  
   Target Server Type    : MySQL
   Target Server Version : 50145
   File Encoding         : 65001
  
   Date: 03/07/2020 11:09:05
  */
  
  SET NAMES utf8mb4;
  SET FOREIGN_KEY_CHECKS = 0;
  
  -- ----------------------------
  -- Table structure for t_ua
  -- ----------------------------
  DROP TABLE IF EXISTS `t_ua`;
  CREATE TABLE `t_ua`  (
    `t_id` int(11) NOT NULL,
    `tName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `tGender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    PRIMARY KEY (`t_id`) USING BTREE
  ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
  
  -- ----------------------------
  -- Records of t_ua
  -- ----------------------------
  INSERT INTO `t_ua` VALUES (1, 'john', 'male');
  INSERT INTO `t_ua` VALUES (2, 'lucy', 'female');
  INSERT INTO `t_ua` VALUES (3, 'lily', 'female');
  INSERT INTO `t_ua` VALUES (4, 'jack', 'male');
  INSERT INTO `t_ua` VALUES (5, 'rose', 'female');
  
  SET FOREIGN_KEY_CHECKS = 1;
  ```

  



