Create Table wgsa_company.Offered_to
(
	Cus_id int,
    Offer_code int,
    primary key(Cus_id,Offer_code),
    foreign key(Cus_id) references Customer(Id),
    foreign key (Offer_code) references Offer(Offer_num)
)