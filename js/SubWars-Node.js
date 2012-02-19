smalltalk.addPackage('SubWars-Node', {});
smalltalk.addClass('WebServer', smalltalk.Object, ['port', 'app', 'dirname', 'faye', 'app', 'express', 'bayeux', 'fs', 'childProcess', 'util', 'redisStore'], 'SubWars-Node');
smalltalk.addMethod(
unescape('_initialize'),
smalltalk.method({
selector: unescape('initialize'),
category: 'initialization',
fn: function (){
var self=this;
smalltalk.send(self, "_initialize", [], smalltalk.Object);
self['@dirname'] = __dirname;
(self['@port']=smalltalk.send(smalltalk.send((typeof process == 'undefined' ? nil : process), "_env", []), "_at_", ["PORT"]));
(($receiver = self['@port']) == nil || $receiver == undefined) ? (function(){return (self['@port']=(5000));})() : $receiver;
(self['@util']=smalltalk.send(self, "_require_", ["util"]));
(self['@childProcess']=smalltalk.send(self, "_require_", ["child_process"]));
(self['@fs']=smalltalk.send(self, "_require_", ["fs"]));
(self['@express']=smalltalk.send(self, "_require_", ["express"]));
(self['@faye']=smalltalk.send(self, "_require_", [unescape("./lib/faye-node.js")]));
(self['@app']=smalltalk.send(self['@express'], "_createServer", []));
(self['@redisStore']=smalltalk.send(smalltalk.send(self, "_require_", [unescape("connect-redis")]), "_value_", [self['@express']]));
(self['@bayeux']=smalltalk.send(smalltalk.send(self['@faye'], "_at_", ["NodeAdapter"]), "_newValue_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("mount", "__minus_gt", [unescape("/faye")]),smalltalk.send("timeout", "__minus_gt", [(45)])])]));
smalltalk.send(self['@bayeux'], "_attach_", [self['@app']]);
(function($rec){smalltalk.send($rec, "_configure", []);return smalltalk.send($rec, "_initializeRoutes", []);})(self);
return self;},
args: [],
source: unescape('initialize%0A%09super%20initialize.%0A%09%3Cself%5B%27@dirname%27%5D%20%3D%20__dirname%3E.%0A%0A%09port%20%3A%3D%20process%20env%20at%3A%20%27PORT%27.%20%22Heroku%20will%20provide%20a%20port%20in%20production%22%0A%09port%20ifNil%3A%20%5B%20port%20%3A%3D%205000%20%5D.%0A%0A%09util%20%3A%3D%20self%20require%3A%20%27util%27.%0A%09childProcess%20%3A%3D%20self%20require%3A%20%27child_process%27.%0A%09fs%20%3A%3D%20self%20require%3A%20%27fs%27.%0A%09express%20%3A%3D%20self%20require%3A%20%27express%27.%0A%09faye%20%3A%3D%20self%20require%3A%20%27./lib/faye-node.js%27.%0A%09app%20%3A%3D%20express%20createServer.%0A%09redisStore%20%3A%3D%20%28self%20require%3A%20%27connect-redis%27%29%20value%3A%20express.%0A%09bayeux%20%3A%3D%20%28faye%20at%3A%20%27NodeAdapter%27%29%20newValue%3A%20%23%7B%20%27mount%27%20-%3E%20%27/faye%27%20.%20%27timeout%27%20-%3E%2045%20%7D.%0A%09bayeux%20attach%3A%20app.%0A%09%0A%09self%0A%09%09configure%3B%0A%09%09initializeRoutes.'),
messageSends: ["initialize", "at:", "env", "ifNil:", "require:", "createServer", "value:", "newValue:", unescape("-%3E"), "attach:", "configure", "initializeRoutes"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_start'),
smalltalk.method({
selector: unescape('start'),
category: 'starting',
fn: function (){
var self=this;
smalltalk.send(self['@app'], "_listen_do_", [smalltalk.send(self['@port'], "_asString", []), (function(){return smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [smalltalk.send("Listening on port: ", "__comma", [smalltalk.send(self['@port'], "_asString", [])])]);})]);
return self;},
args: [],
source: unescape('start%0A%09app%20listen%3A%20port%20asString%20do%3A%20%5B%0A%09%09console%20log%3A%20%27Listening%20on%20port%3A%20%27%2C%20port%20asString%20%5D'),
messageSends: ["listen:do:", "asString", "log:", unescape("%2C")],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_initializeRoutes'),
smalltalk.method({
selector: unescape('initializeRoutes'),
category: 'initialization',
fn: function (){
var self=this;
(function($rec){smalltalk.send($rec, "_get_do_", [unescape("/"), (function(req, res){smalltalk.send(self, "_initializeVisitor_", [req]);return smalltalk.send(res, "_render_with_", ["index", smalltalk.HashedCollection._fromPairs_([smalltalk.send("session", "__minus_gt", [smalltalk.send(req, "_session", [])])])]);})]);return smalltalk.send($rec, "_put_do_", [unescape("/*"), (function(req, res){return smalltalk.send(self, "_handlePUT_respondTo_", [req, res]);})]);})(self['@app']);
return self;},
args: [],
source: unescape('initializeRoutes%0A%09app%0A%09%09get%3A%20%27/%27%20do%3A%20%5B%20%3Areq%20%3Ares%20%7C%0A%09%09%09self%20initializeVisitor%3A%20req.%0A%09%09%09res%20render%3A%20%27index%27%20with%3A%20%23%7B%20%27session%27%20-%3E%20req%20session%20%7D%20%5D%3B%0A%09%09put%3A%20%27/*%27%20do%3A%20%5B%20%3Areq%20%3Ares%20%7C%20self%20handlePUT%3A%20req%20respondTo%3A%20res%20%5D'),
messageSends: ["get:do:", "initializeVisitor:", "render:with:", unescape("-%3E"), "session", "put:do:", "handlePUT:respondTo:"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_configure'),
smalltalk.method({
selector: unescape('configure'),
category: 'initialization',
fn: function (){
var self=this;
(function($rec){smalltalk.send($rec, "_configure_", [(function(){return (function($rec){smalltalk.send($rec, "_set_val_", ["view options", smalltalk.HashedCollection._fromPairs_([smalltalk.send("layout", "__minus_gt", [false])])]);smalltalk.send($rec, "_set_val_", ["view engine", "jade"]);smalltalk.send($rec, "_use_", [smalltalk.send(self['@express'], "_logger", [])]);smalltalk.send($rec, "_use_", [smalltalk.send(self['@express'], "_static_", [smalltalk.send(self['@dirname'], "__comma", [unescape("/public")])])]);smalltalk.send($rec, "_use_", [smalltalk.send(self['@express'], "_cookieParser", [])]);smalltalk.send($rec, "_use_", [smalltalk.send(self['@express'], "_session_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("secret", "__minus_gt", [unescape("i%27m%20gonna%20getcha%21")]),smalltalk.send("store", "__minus_gt", [smalltalk.send(self['@redisStore'], "_new", [])])])])]);return smalltalk.send($rec, "_use_", [smalltalk.send(self['@app'], "_at_", ["router"])]);})(self['@app']);})]);smalltalk.send($rec, "_configure_with_", ["development", (function(){return smalltalk.send(self['@app'], "_use_", [smalltalk.send(self['@express'], "_errorHandler_", [smalltalk.HashedCollection._fromPairs_([smalltalk.send("dumpExceptions", "__minus_gt", [true]),smalltalk.send("showStack", "__minus_gt", [true])])])]);})]);return smalltalk.send($rec, "_configure_with_", ["production", (function(){return smalltalk.send(self['@app'], "_use_", [smalltalk.send(self['@express'], "_errorHandler", [])]);})]);})(self['@app']);
return self;},
args: [],
source: unescape('configure%0A%09app%20configure%3A%20%5B%20app%0A%09%09set%3A%20%27view%20options%27%20val%3A%20%23%7B%20%27layout%27%20-%3E%20false%20%7D%3B%0A%09%09set%3A%20%27view%20engine%27%20val%3A%20%27jade%27%3B%0A%09%09use%3A%20express%20logger%3B%0A%09%09use%3A%20%28express%20static%3A%20dirname%2C%20%27/public%27%29%3B%0A%09%09use%3A%20express%20cookieParser%3B%0A%09%09use%3A%20%28express%20session%3A%20%23%7B%20%27secret%27%20-%3E%20%27i%27%27m%20gonna%20getcha%21%27.%20%27store%27%20-%3E%20redisStore%20new%20%7D%29%3B%0A%09%09use%3A%20%28app%20at%3A%20%27router%27%29%5D%3B%0A%0A%09configure%3A%20%27development%27%20with%3A%20%5B%20app%0A%09%09use%3A%20%28express%20errorHandler%3A%20%23%7B%20%27dumpExceptions%27%20-%3E%20true%20.%20%27showStack%27%20-%3E%20true%20%7D%29%20%5D%3B%0A%0A%09configure%3A%20%27production%27%20with%3A%20%5B%20app%0A%09%09use%3A%20%28express%20errorHandler%29%20%5D'),
messageSends: ["configure:", "set:val:", unescape("-%3E"), "use:", "logger", "static:", unescape("%2C"), "cookieParser", "session:", "new", "at:", "configure:with:", "errorHandler:", "errorHandler"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_handlePUT_respondTo_'),
smalltalk.method({
selector: unescape('handlePUT%3ArespondTo%3A'),
category: 'request handling',
fn: function (aRequest, aResponse){
var self=this;
var path=nil;
var stream=nil;
(path=smalltalk.send(".", "__comma", [smalltalk.send(smalltalk.send(aRequest, "_url", []), "_asString", [])]));
(stream=smalltalk.send(self['@fs'], "_createWriteStream_", [path]));
(function($rec){smalltalk.send($rec, "_setEncoding_", ["utf8"]);smalltalk.send($rec, "_on_do_", ["data", (function(chunk){return smalltalk.send(stream, "_write_", [chunk]);})]);return smalltalk.send($rec, "_on_do_", ["end", (function(){smalltalk.send(stream, "_end", []);smalltalk.send(self, "_recompileJS", []);return smalltalk.send(self, "_respondOKTo_", [aResponse]);})]);})(aRequest);
return self;},
args: ["aRequest", "aResponse"],
source: unescape('handlePUT%3A%20aRequest%20respondTo%3A%20aResponse%0A%09%7C%20path%20stream%20%7C%0A%09path%20%3A%3D%20%27.%27%2C%20aRequest%20url%20asString.%0A%09stream%20%3A%3D%20fs%20createWriteStream%3A%20path.%0A%09aRequest%0A%09%09setEncoding%3A%20%27utf8%27%3B%0A%09%09on%3A%20%27data%27%20do%3A%20%5B%20%3Achunk%20%7C%20stream%20write%3A%20chunk%20%5D%3B%0A%09%09on%3A%20%27end%27%20do%3A%20%5B%0A%09%09%09stream%20end.%0A%09%09%09self%20recompileJS.%0A%09%09%09self%20respondOKTo%3A%20aResponse%20%5D'),
messageSends: [unescape("%2C"), "asString", "url", "createWriteStream:", "setEncoding:", "on:do:", "write:", "end", "recompileJS", "respondOKTo:"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_respondOKTo_'),
smalltalk.method({
selector: unescape('respondOKTo%3A'),
category: 'request handling',
fn: function (aResponse){
var self=this;
smalltalk.send(aResponse, "_send_", ["Success"]);
return self;},
args: ["aResponse"],
source: unescape('respondOKTo%3A%20aResponse%0A%09aResponse%20send%3A%20%27Success%27.'),
messageSends: ["send:"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_require_'),
smalltalk.method({
selector: unescape('require%3A'),
category: 'private',
fn: function (aModuleString){
var self=this;
return smalltalk.send((typeof require == 'undefined' ? nil : require), "_value_", [aModuleString]);
return self;},
args: ["aModuleString"],
source: unescape('require%3A%20aModuleString%0A%09%22call%20to%20the%20Node%20require%20function%22%0A%09%5Erequire%20value%3A%20aModuleString'),
messageSends: ["value:"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_recompileJS'),
smalltalk.method({
selector: unescape('recompileJS'),
category: 'actions',
fn: function (){
var self=this;
((($receiver = smalltalk.send("production", "__eq", [smalltalk.send(smalltalk.send(self['@app'], "_settings", []), "_env", [])])).klass === smalltalk.Boolean) ? (! $receiver ? (function(){return smalltalk.send(self['@childProcess'], "_exec_callback_", ["rake compile:all", (function(err, stdout, stderr){smalltalk.send(self['@util'], "_puts_", [stdout]);return smalltalk.send(self['@util'], "_puts_", [stderr]);})]);})() : nil) : smalltalk.send($receiver, "_ifFalse_", [(function(){return smalltalk.send(self['@childProcess'], "_exec_callback_", ["rake compile:all", (function(err, stdout, stderr){smalltalk.send(self['@util'], "_puts_", [stdout]);return smalltalk.send(self['@util'], "_puts_", [stderr]);})]);})]));
return self;},
args: [],
source: unescape('recompileJS%0A%09%28%27production%27%20%3D%20app%20settings%20env%29%20ifFalse%3A%20%5B%0A%09%09childProcess%20exec%3A%20%27rake%20compile%3Aall%27%20callback%3A%20%5B%3Aerr%20%3Astdout%20%3Astderr%7C%0A%09%09%09util%20puts%3A%20stdout.%0A%09%09%09util%20puts%3A%20stderr%5D%5D'),
messageSends: ["ifFalse:", unescape("%3D"), "env", "settings", "exec:callback:", "puts:"],
referencedClasses: []
}),
smalltalk.WebServer);

smalltalk.addMethod(
unescape('_initializeVisitor_'),
smalltalk.method({
selector: unescape('initializeVisitor%3A'),
category: 'initialization',
fn: function (aRequest){
var self=this;
var newId=nil;
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", ["initial visitor_id"]);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [smalltalk.send(aRequest, "_session", [])]);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_at_", [smalltalk.send(aRequest, "_session", []), "visitor_id"]);
smalltalk.send((smalltalk.Visitor || Visitor), "_nextId_", [(function(id){(function($rec){smalltalk.send($rec, "_log_", [unescape("-----------------")]);return smalltalk.send($rec, "_log_", [id]);})((typeof console == 'undefined' ? nil : console));return (newId=id);})]);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [newId]);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_at_", [smalltalk.send(aRequest, "_session", []), "visitor_id"]);
smalltalk.send(smalltalk.send(aRequest, "_cookies", []), "_at_put_", ["vid", smalltalk.send(smalltalk.send(aRequest, "_session", []), "_at_", ["visitor_id"])]);
return self;},
args: ["aRequest"],
source: unescape('initializeVisitor%3A%20aRequest%0A%09%7CnewId%7C%0A%09console%20log%3A%20%27initial%20visitor_id%27.%0A%09console%20log%3A%20aRequest%20session.%0A%09console%20log%3A%20aRequest%20session%20at%3A%20%27visitor_id%27.%0A%09Visitor%20nextId%3A%20%5B%3Aid%7C%20console%20log%3A%20%27-----------------%27%3B%20log%3A%20id.%20newId%20%3A%3D%20id%5D.%0A%09console%20log%3A%20newId.%0A%09%22%28aRequest%20session%20at%3A%20%27visitor_id%27%29%20ifNil%3A%20%5B%0A%09%09aRequest%20session%20at%3A%20%27visitor_id%27%20put%3A%20Visitor%20nextId%5D.%22%0A%09console%20log%3A%20aRequest%20session%20at%3A%20%27visitor_id%27.%0A%09aRequest%20cookies%20at%3A%20%27vid%27%20put%3A%20%28aRequest%20session%20at%3A%20%27visitor_id%27%29.'),
messageSends: ["log:", "session", "log:at:", "nextId:", "at:put:", "cookies", "at:"],
referencedClasses: ["Visitor"]
}),
smalltalk.WebServer);


smalltalk.addMethod(
unescape('_main'),
smalltalk.method({
selector: unescape('main'),
category: 'main',
fn: function (){
var self=this;
return smalltalk.send(smalltalk.send(self, "_new", []), "_start", []);
return self;},
args: [],
source: unescape('main%0A%09%5Eself%20new%20start'),
messageSends: ["start", "new"],
referencedClasses: []
}),
smalltalk.WebServer.klass);


smalltalk.addClass('Visitor', smalltalk.Object, ['id'], 'SubWars-Node');
smalltalk.addMethod(
unescape('_id'),
smalltalk.method({
selector: unescape('id'),
category: 'accessing',
fn: function (){
var self=this;
return (($receiver = self['@id']) == nil || $receiver == undefined) ? (function(){return (-1);})() : $receiver;
return self;},
args: [],
source: unescape('id%0A%09%5Eid%20ifNil%3A%20%5B-1%5D'),
messageSends: ["ifNil:"],
referencedClasses: []
}),
smalltalk.Visitor);


smalltalk.Visitor.klass.iVarNames = ['redis','redisClient'];
smalltalk.addMethod(
unescape('_nextId'),
smalltalk.method({
selector: unescape('nextId'),
category: 'accessing',
fn: function (){
var self=this;
try{smalltalk.send(self, "_initializeRedis", []);
smalltalk.send((typeof console == 'undefined' ? nil : console), "_log_", [unescape("---------------------------------%5Cn")]);
smalltalk.send(self['@redisClient'], "_incr_callback_", ["visitors:id", (function(err, res){return (function(){throw({name: 'stReturn', selector: '_nextId', fn: function(){return res}})})();})]);
return self;
} catch(e) {if(e.name === 'stReturn' && e.selector === '_nextId'){return e.fn()} throw(e)}},
args: [],
source: unescape('nextId%0A%09self%20initializeRedis.%0A%09console%20log%3A%20%27---------------------------------%5Cn%27.%0A%09redisClient%20incr%3A%20%27visitors%3Aid%27%20callback%3A%20%5B%3Aerr%20%3Ares%7C%20%5Eres%5D.'),
messageSends: ["initializeRedis", "log:", "incr:callback:"],
referencedClasses: []
}),
smalltalk.Visitor.klass);

smalltalk.addMethod(
unescape('_initializeRedis'),
smalltalk.method({
selector: unescape('initializeRedis'),
category: 'accessing',
fn: function (){
var self=this;
(($receiver = self['@redis']) == nil || $receiver == undefined) ? (function(){return (self['@redis']=smalltalk.send((typeof require == 'undefined' ? nil : require), "_value_", ["redis"]));})() : $receiver;
(($receiver = self['@redisClient']) == nil || $receiver == undefined) ? (function(){return (self['@redisClient']=smalltalk.send(self['@redis'], "_createClient", []));})() : $receiver;
return self;},
args: [],
source: unescape('initializeRedis%0A%09redis%20ifNil%3A%20%5Bredis%20%3A%3D%20require%20value%3A%20%27redis%27%5D.%0A%09redisClient%20ifNil%3A%20%5BredisClient%20%3A%3D%20redis%20createClient%5D'),
messageSends: ["ifNil:", "value:", "createClient"],
referencedClasses: []
}),
smalltalk.Visitor.klass);

smalltalk.addMethod(
unescape('_nextId_'),
smalltalk.method({
selector: unescape('nextId%3A'),
category: 'accessing',
fn: function (aBlock){
var self=this;
smalltalk.send(self, "_initializeRedis", []);
smalltalk.send(self['@redisClient'], "_incr_callback_", ["visitors:id", (function(err, res){return smalltalk.send(aBlock, "_value_", [res]);})]);
return self;},
args: ["aBlock"],
source: unescape('nextId%3A%20aBlock%0A%09self%20initializeRedis.%0A%09redisClient%20incr%3A%20%27visitors%3Aid%27%20callback%3A%20%5B%3Aerr%20%3Ares%7C%20aBlock%20value%3A%20res%5D.'),
messageSends: ["initializeRedis", "incr:callback:", "value:"],
referencedClasses: []
}),
smalltalk.Visitor.klass);


