module.exports = function(prefix, entity, version = ""){

  if (version == ""){
    str = prefix + entity;

  }

  else{

    str = prefix + entity + "/" + version;

  }

  console.log(str);
  return str;
};
