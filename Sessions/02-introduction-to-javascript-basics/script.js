    // ---------------- task 1 ----------------
    var x = "global var";
    let y = "global let";
    const z = "global const"; 

    function testScope() {
      var x = "function var";
      let y = "function let";
      const z = "function const";

      console.log(x, y, z);

      if (true) {
        var x = "block var";
        let y = "block let";
        const z = "block const";

        console.log(x, y, z);
      }

      console.log(x, y, z);
    }

    testScope();
    console.log(x, y, z);


    // ---------------- task 2 ----------------
    var a = 10;
    var a = 20; // redeclare allowed
    a = 30; // reassign allowed

    let b = 10;
    //let b = 20; // error: cannot redeclare
    b = 30; // reassign allowed

    const c = 10;
    // const c = 20; // error: cannot redeclare
    // c = 30; // const will give error: cannot reassign


    // ---------------- task 3 ----------------
    function extractHashtags(str) {
      return str.match(/#\w+/g) || [];
    }

    console.log(extractHashtags("Loving #javascript and #coding"));


    // ---------------- task 4 ----------------
    function shortenText(text, maxLength) {
      return text.length <= maxLength 
        ? text 
        : text.slice(0, maxLength) + "...";
    }

    console.log(shortenText("Devam Satasiya", 5));


    // ---------------- task 5 ----------------
    const numbers = [1, 2, 3, 4, 5];

    const doubled = numbers.map(n => n * 2);
    const evens = numbers.filter(n => n % 2 === 0);

    console.log(doubled);
    console.log(evens);


    // ---------------- task 6 ----------------
    function findLongestWord(words) {
      return words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
      , "");
    }

    console.log(findLongestWord(["hi", "hello", "javascript"]));


    // ---------------- task 7 ----------------
    function canVote(age) {
      if (age >= 18) {
        return "Yes";
      } else {
        return "No";
      }
    }


    // ---------------- task 8 ----------------
    function canVoteShort(age) {
      return age >= 18 ? "Yes" : "No";
    }

    console.log(canVote(20));
    console.log(canVoteShort(15));


    // ---------------- task 9 ----------------
    function changeHeading() {
      document.getElementById("heading").textContent = "Text Changed";
    }


    // ---------------- task 10 ----------------
    function toggleTheme() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
        }
    }
