var loopbackslug = require("loopback-slug");

module.exports = function(Experience) {
  Experience.observe('before save', function (ctx, next) {  //!!important 
    loopbackslug.middleware(Experience, ctx, {
      fields: ['title','company'],
      slug: "slug",
      lowercase: true,
      separator: "-"
    }, function (err) {
      if (err) return next(err);
      else next(null);
    });
  });
};