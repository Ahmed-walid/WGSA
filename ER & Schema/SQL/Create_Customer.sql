CREATE TABLE wgsa_company.Customer 
(
Fname varchar(50),
Lname varchar(50),
Id int,
Phone_num int,
Plan_code int,
Balance float,
Address varchar(50),
Gender char ,
Used_min int,
Used_megas int,
Renewal_date date,
primary key (Id),
foreign key (Plan_code) references plan(Plan_code)
);


