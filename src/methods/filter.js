import { extend_selection } from "../core/extend_selection";
import { search } from "../core/utils";

export function filter(fun) {
  var subgroups = [], subgroup, group, node;

  if (typeof fun !== "function") {
    fun = _selection_filter(fun);
  } 

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && fun.call(node, node.__data__, i, j)) {
        subgroup.push(node);
      }
    }
  }
  return extend_selection(subgroups);
}

function _selection_filter(selector) {
  return function() {
    return search(this, selector, true);
  };
}

