create table wgsa_company.FAQS
(
Answer varchar(100),
Question varchar(100),
Question_code int,
Answered_by int,
primary key (Question_code),
foreign key (Answered_by) references Employee(SSn)
)