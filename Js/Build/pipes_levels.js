"use strict";const pipes_levels=[[[[2,"d"],[6,"c"],[1,"d"]],[[14,"c"],[15,"s"],[3,"c"]],[[8,"d"],[8,"d"],[8,"d"]]],[[[6,"c"],[5,"c"],[3,"c"]],[[12,"c"],[1,"s"],[10,"c"]],[[4,"d"],[5,"c"],[9,"c"]]],[[[6,"c"],[3,"c"],[2,"d"]],[[10,"c"],[10,"s"],[10,"c"]],[[8,"d"],[12,"c"],[9,"c"]]],[[[6,"c"],[7,"c"],[1,"d"]],[[8,"d"],[10,"s"],[2,"d"]],[[4,"d"],[13,"c"],[9,"c"]]],[[[2,"d"],[4,"d"],[3,"c"],[2,"d"]],[[12,"c"],[5,"c"],[15,"c"],[9,"c"]],[[2,"d"],[6,"c"],[9,"s"],[2,"d"]],[[12,"c"],[13,"c"],[5,"c"],[9,"c"]]],[[[4,"d"],[3,"c"],[4,"d"],[3,"c"]],[[4,"d"],[15,"c"],[7,"c"],[11,"c"]],[[6,"c"],[9,"c"],[10,"s"],[10,"c"]],[[12,"c"],[1,"d"],[8,"d"],[8,"d"]]],[[[4,"d"],[7,"c"],[5,"c"],[1,"d"]],[[4,"d"],[15,"c"],[7,"c"],[1,"d"]],[[6,"c"],[15,"c"],[13,"s"],[3,"c"]],[[8,"d"],[8,"d"],[4,"d"],[9,"c"]]],[[[6,"c"],[5,"c"],[5,"c"],[1,"d"]],[[12,"c"],[3,"c"],[2,"d"],[2,"d"]],[[4,"d"],[15,"c"],[15,"s"],[11,"c"]],[[4,"d"],[9,"c"],[8,"d"],[8,"d"]]],[[[2,"d"],[2,"d"],[4,"d"],[3,"c"]],[[14,"c"],[15,"c"],[7,"c"],[9,"c"]],[[10,"c"],[8,"d"],[14,"s"],[1,"d"]],[[12,"c"],[1,"d"],[12,"c"],[1,"d"]]],[[[4,"d"],[7,"c"],[7,"c"],[1,"d"]],[[2,"d"],[8,"d"],[14,"c"],[3,"c"]],[[10,"c"],[4,"d"],[11,"s"],[8,"d"]],[[12,"c"],[5,"c"],[13,"c"],[1,"d"]]],[[[4,"d"],[5,"c"],[5,"c"],[3,"c"]],[[6,"c"],[5,"c"],[3,"c"],[10,"c"]],[[10,"c"],[4,"d"],[9,"s"],[10,"c"]],[[12,"c"],[5,"c"],[5,"c"],[9,"c"]]],[[[4,"d"],[7,"c"],[7,"c"],[3,"c"]],[[4,"d"],[11,"c"],[8,"d"],[8,"d"]],[[6,"c"],[15,"c"],[7,"s"],[3,"c"]],[[8,"d"],[8,"d"],[8,"d"],[8,"d"]]],[[[2,"d"],[2,"d"],[6,"c"],[1,"d"]],[[12,"c"],[13,"c"],[11,"c"],[2,"d"]],[[4,"d"],[7,"c"],[13,"s"],[11,"c"]],[[4,"d"],[13,"c"],[1,"d"],[8,"d"]]],[[[4,"d"],[7,"c"],[5,"c"],[3,"c"]],[[6,"c"],[9,"c"],[2,"d"],[10,"c"]],[[8,"d"],[2,"d"],[14,"s"],[11,"c"]],[[4,"d"],[13,"c"],[9,"c"],[8,"d"]]],[[[2,"d"],[4,"d"],[3,"c"],[4,"d"],[3,"c"]],[[14,"c"],[3,"c"],[14,"c"],[5,"c"],[11,"c"]],[[8,"d"],[14,"c"],[11,"s"],[2,"d"],[8,"d"]],[[4,"d"],[11,"c"],[14,"c"],[15,"c"],[1,"d"]],[[4,"d"],[9,"c"],[8,"d"],[12,"c"],[1,"d"]]],[[[4,"d"],[7,"c"],[5,"c"],[5,"c"],[3,"c"]],[[2,"d"],[10,"c"],[6,"c"],[1,"d"],[10,"c"]],[[10,"c"],[12,"c"],[15,"s"],[1,"d"],[10,"c"]],[[14,"c"],[1,"d"],[10,"c"],[2,"d"],[10,"c"]],[[12,"c"],[5,"c"],[13,"c"],[9,"c"],[8,"d"]]],[[[2,"d"],[2,"d"],[2,"d"],[2,"d"],[2,"d"]],[[10,"c"],[10,"c"],[10,"c"],[10,"c"],[10,"c"]],[[10,"c"],[10,"c"],[10,"s"],[10,"c"],[10,"c"]],[[10,"c"],[10,"c"],[10,"c"],[10,"c"],[10,"c"]],[[12,"c"],[13,"c"],[13,"c"],[13,"c"],[9,"c"]]],[[[6,"c"],[7,"c"],[7,"c"],[5,"c"],[3,"c"]],[[8,"d"],[8,"d"],[10,"c"],[4,"d"],[11,"c"]],[[4,"d"],[7,"c"],[9,"s"],[4,"d"],[11,"c"]],[[4,"d"],[15,"c"],[1,"d"],[4,"d"],[9,"c"]],[[4,"d"],[13,"c"],[5,"c"],[5,"c"],[1,"d"]]],[[[4,"d"],[7,"c"],[7,"c"],[7,"c"],[3,"c"]],[[6,"c"],[9,"c"],[8,"d"],[10,"c"],[8,"d"]],[[10,"c"],[4,"d"],[7,"s"],[15,"c"],[3,"c"]],[[14,"c"],[1,"d"],[8,"d"],[8,"d"],[10,"c"]],[[8,"d"],[4,"d"],[5,"c"],[5,"c"],[9,"c"]]],[[[4,"d"],[7,"c"],[7,"c"],[7,"c"],[3,"c"]],[[4,"d"],[15,"c"],[9,"c"],[8,"d"],[8,"d"]],[[4,"d"],[11,"c"],[2,"s"],[6,"c"],[3,"c"]],[[4,"d"],[15,"c"],[13,"c"],[11,"c"],[8,"d"]],[[4,"d"],[9,"c"],[4,"d"],[13,"c"],[1,"d"]]],[[[6,"c"],[5,"c"],[5,"c"],[5,"c"],[3,"c"]],[[10,"c"],[6,"c"],[5,"c"],[3,"c"],[10,"c"]],[[10,"c"],[10,"c"],[4,"s"],[9,"c"],[10,"c"]],[[10,"c"],[12,"c"],[5,"c"],[5,"c"],[9,"c"]],[[12,"c"],[5,"c"],[5,"c"],[5,"c"],[1,"d"]]],[[[4,"d"],[3,"c"],[2,"d"],[4,"d"],[3,"c"]],[[2,"d"],[10,"c"],[10,"c"],[2,"d"],[10,"c"]],[[14,"c"],[11,"c"],[14,"s"],[15,"c"],[11,"c"]],[[10,"c"],[14,"c"],[11,"c"],[8,"d"],[10,"c"]],[[8,"d"],[8,"d"],[12,"c"],[1,"d"],[8,"d"]]]];