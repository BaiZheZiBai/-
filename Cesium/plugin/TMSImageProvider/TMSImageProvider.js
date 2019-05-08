var TMSImageProvider = function TMSImageProvider(description) {
    var defaultCredit = new Cesium.Credit('TMS');
    description = Cesium.defaultValue(description, {});
 /*   this._tilingScheme = new Cesium.GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
    });
*/
	this._geodetic = true;
	 if (description.tilingSchemeName === 'geodetic' || description.tilingSchemeName === 'global-geodetic')
		 {
			this._tilingScheme = new Cesium.GeographicTilingScheme({ ellipsoid : description.ellipsoid });
			this._geodetic = true;
		}
		else if (description.tilingSchemeName === 'mercator' || description.tilingSchemeName === 'global-mercator')
		{
			this._tilingScheme = new Cesium.WebMercatorTilingScheme({ ellipsoid : description.ellipsoid });
			this._geodetic = false;
		}

	this._tilingScheme = Cesium.defaultValue(this._tilingScheme,new Cesium.GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
    }));

    this._tileWidth = 256;
    this._tileHeight = 256;
    this._fileExtension = Cesium.defaultValue(description.fileExtension, 'jpg');
    this._proxy = description.proxy;
    this._tileDiscardPolicy = description.tileDiscardPolicy;
    this._minimumLevel = description.minimumLevel;
    this._maximumLevel = description.maximumLevel;
//    this._extent = new Cesium.Rectangle(0 - Math.PI, 0 - Math.PI / 2, Math.PI, Math.PI / 2);
//    this._rectangle = new Cesium.Rectangle(0 - Math.PI, 0 - Math.PI / 2, Math.PI, Math.PI / 2);
    this._extent = Cesium.defaultValue(description.extent, this._tilingScheme.rectangle);
	  this._rectangle = Cesium.defaultValue(description.rectangle, this._tilingScheme.rectangle);
    this._ready = true;
    this.baseurl = description.url;
    this.needaddone = Cesium.defaultValue(description.addone,false);
    if (description.leveldiv) {
        this._leveldiv = description.leveldiv;
        this.baseurl2 = description.urlformat2
    }
    var credit = Cesium.defaultValue(description.credit, defaultCredit);
    if (typeof credit === 'string') {
        credit = new Cesium.Credit(credit)
    }
    this._credit = credit;
	this._flipY = Cesium.defaultValue(description.flipY,true);
};
Cesium.defineProperties(TMSImageProvider.prototype, {
    tileWidth: {
        get: function () {
            return this._tileWidth
        }
    },
    tileHeight: {
        get: function () {
            return this._tileHeight
        }
    },
    defaultAlpha: {
        get: function () {
            return 1
        }
    },
    hasAlphaChannel: {
        get: function () {
            return true
        }
    },
    maximumLevel: {
        get: function () {
            return this._maximumLevel
        }
    },
    minimumLevel: {
        get: function () {
            return this._minimumLevel
        }
    },
    tilingScheme: {
        get: function () {
            return this._tilingScheme
        }
    },
    extent: {
        get: function () {
            return this._extent
        }
    },
    rectangle: {
        get: function () {
            return this._rectangle
        }
    },
    ready: {
        get: function () {
            return this._ready
        }
    },
    minimumTerrainLevel: {
        get: function () {
            return 0
        }
    },
    maximumTerrainLevel: {
        get: function () {
            return 18
        }
    }
});
TMSImageProvider.prototype.requestImage = function (x, y, level) {
    if (this.needaddone) {
        x += 1;
        y += 1;
        level += 1
    }
//    var tempurl = this.baseurl;
    var tempurl = this.baseurl;// + '/{z}/{x}/{y}.' + this._fileExtension;


    if (this._leveldiv) if (level > this._leveldiv) tempurl = this.baseurl2;
    var url = tempurl.replace("{x}", x);
    //url = url.replace("{l}", y % 8);
    url = url.replace("{y}", (this._flipY ? (this._tilingScheme.getNumberOfYTilesAtLevel(level)-y-1) : y) );
    if(!this._geodetic)
	{
		url = url.replace("{z}", level);
	}
	else
	{
		    url = url.replace("{z}", level+1);
	}

	 if (Cesium.defined(this._proxy)) {
            url = this._proxy.getURL(url);
        }
    return Cesium.ImageryProvider.loadImage(this, url)
};
