/*CREATE TABLE wgsa_company.Employee
(
Fname varchar(50),
Lname varchar(50),
Dnum int ,
Address varchar(50),
Ssn int ,
Postion varchar(50),
Salary int,
Branch_num int,
Hours int,
Gender char,
Phone_num int,
Super_ssn int,
primary key (Ssn),
foreign key(Super_ssn) references Employee(Ssn),
foreign key (Branch_num) references Branch(Bnum)
);*/

ALTER TABLE wgsa_company.Employee
ADD FOREIGN KEY (Dnum) REFERENCES Department(Dnum);