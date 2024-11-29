exports.homepage = async (req, res, next) => {
  const locals = {
    title: "NodeJs Notes",
    description: "free Nodejs Notes",
  };
  res.render('index',{
    locals, 
    layout:'../views/layouts/front-page-layout.ejs'
  });
};


exports.about= async(req,res,next)=>{ 
    const locals = { 
        title: "about-NodeJs Notes",
        description: "about-free Nodejs Notes",
      };
      res.render('about',locals);
    };