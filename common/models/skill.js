var loopbackslug = require("loopback-slug");

module.exports = function(Skill) {
  Skill.observe('before save', function (ctx, next) {  //!!important
    loopbackslug.middleware(Skill, ctx, {
      fields: ['name'],
      slug: "slug",
      lowercase: true,
      separator: "-"
    }, function (err) {
      if (err) return next(err);
      else next(null);
    });
  });
};
