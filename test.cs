using System.Collections.Generic;
namespace LINQLeftOuterJoin
{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int AddressId { get; set; }
    }
    public class Address
    {
        public int ID { get; set; }
        public string AddressLine { get; set; }
    
    public static void Main()
        {
var employees = new List<Employee>()
            {
                new Employee { ID = 1, Name = "Preety", AddressId = 1},
                new Employee { ID = 2, Name = "Priyanka", AddressId =2},
                new Employee { ID = 3, Name = "Anurag", AddressId = 0},
                new Employee { ID = 4, Name = "Pranaya", AddressId = 0},
                new Employee { ID = 5, Name = "Hina", AddressId = 5},
                new Employee { ID = 6, Name = "Sambit", AddressId = 6}

            };
            var addresses = new List<Address>()
            {
                new Address { ID = 1, AddressLine = "AddressLine1"},
                new Address { ID = 2, AddressLine = "AddressLine2"},
                new Address { ID = 5, AddressLine = "AddressLine5"},
                new Address { ID = 6, AddressLine = "AddressLine6"},
            };

            var MSOuterJOIN = employees //Left Data Source
                                                         //Performing Group join with Right Data Source
    .GroupJoin(
        addresses, //Right Data Source
        employee => employee.AddressId, //Outer Key Selector, i.e. Left Data Source Common Property
        address => address.ID, //Inner Key Selector, i.e. Right Data Source Common Property
        (employee, address) => new { employee, address } //Projecting the Result
    ).SelectMany(
                                    x => x.address.DefaultIfEmpty(), //Performing Left Outer Join 
                                    (employee, address) => new { employee.employee, address } //Final Result Set
                               );
            foreach (var item in MSOuterJOIN)
            {
                Console.WriteLine($"Name : {item.employee.Name} ");
            }
            //Console.ReadLine();
        }
    }
}