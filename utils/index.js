const disrupt = (array) => {
  if (array.length < 1) return array
  var t = array.sort(function (a, b) { return (Math.random() - 0.5) });
  return [...t];
}

module.exports  = disrupt