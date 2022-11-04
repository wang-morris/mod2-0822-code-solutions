select "customers"."firstName",
       "customers"."lastName",
     sum("payments"."amount") as "totalPaid"
   from "customers"
   join "payments" using ("customerId")
group by "customers"."firstName",
         "customers"."lastName"
order by "totalPaid" desc;
