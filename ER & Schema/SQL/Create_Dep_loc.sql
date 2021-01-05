Create Table wgsa_company.Dep_loc
(
	Dno int,
    Bnum int,
    primary key(Bnum,Dno),
    foreign key(Bnum) references Branch(Bnum),
    foreign key(Dno) references Department(Dnum)
)