//^ --Modal trigger script
document.addEventListener('DOMContentLoaded', function() {
    var options= {
      preventScrolling: true,
    }
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });