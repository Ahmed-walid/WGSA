Create table wgsa_company.Complaint
(
C_Code int,
C_Status varchar(10),
C_Descrip varchar(50),
Complaint_by int,
Complaint_date date,
Replied_by int,
Reply_date date,
Reply varchar(200),
primary key(C_Code),
foreign key(Complaint_by) references Customer(Id),
foreign key (Replied_by) references Employee(Ssn)
)