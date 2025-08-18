(function(){
  var q = [];
  function flush(){
    if(!navigator.onLine) return;
    if(!eg._cfg) return;
    var url = (eg._cfg.ingestUrl) || '/api/public/ingest';
    while(q.length){
      var ev = q.shift();
      try { fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(ev) }); }
      catch(e) { q.unshift(ev); break; }
    }
  }
  var eg = function(cmd){
    var args = Array.prototype.slice.call(arguments, 1);
    if(cmd === 'init') { eg._cfg = args[0] || {}; flush(); return; }
    if(cmd === 'event') { q.push({ name: args[0], payload: args[1]||{}, ts: Date.now() }); flush(); return; }
  };
  window.addEventListener('online', flush);
  window.EcomGuard = eg;
})();

