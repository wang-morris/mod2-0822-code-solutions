select "firstName",
       "lastName"
  from "payments"
  join "customers" using ("customerId")
order by "amount"
  limit 10;
