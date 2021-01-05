CREATE TABLE wgsa_company.Card
(
	Serial_number int,
    Recharge_code int,
    Card_value int,
	Is_charged bool,
    Recharged_by int,
    Recharge_date date,
    primary key (Serial_number),
    foreign key (Recharged_by) references Customer(Id)
)