const CampaignRouter = require('../../router/CampaignRouter');

describe("CampaignRouter", () => {
    let campaignRouter;
    let campaignService;
    let req;
    let res;
    let resultCampaign = [{
        "id": 1,
        "title": "Killer Campaign",
        "short_description": "Moon and Lambos",
        "project_photo": "",
        "video_url": null,
        "long_description": "We will land on the moon with Lambos",
        "full_name": "Boss",
        "email": "max@max.com",
        "company_name": "Some Weird Company",
        "company_legal_form": null,
        "company_reg_id": null,
        "company_country": null,
        "start_date": "2019-01-15T16:00:00.000Z",
        "end_date": "2019-02-14T16:00:00.000Z",
        "soft_cap": "50.50",
        "hard_cap": "200.80",
        "total_supply": 1000000,
        "token_name": null,
        "decimal_places": null,
        "token_symbol": null,
        "conversion_ratio": null,
        "status": "pending",
        "user_id": 1,
        "eth_address": "0x3c532eb375ee100af8ebcc7dfc952e012f3edde1",
        "token_address": "0x94a633cbce71881ea83367031b2354596e725e44",
        "keystore": null,
        "token_id": 1,
        "created_at": "2018-09-10T21:23:08.835Z",
        "updated_at": "2018-09-10T21:23:08.835Z"
    }, ]

    beforeEach(() => {
        campaignService = jasmine.createSpyObj("resultCampaign", {
            searchCampaign: Promise.resolve(resultCampaign),
            getCampaign: Promise.resolve(resultCampaign),
            getWatchlistedCampaigns: Promise.resolve([]),
            getByCreator: Promise.resolve([1]),
            postCampaign: Promise.resolve([1]),
            putCampaign: Promise.resolve([1]),
            deleteCampaign: Promise.resolve([1]),
            getPending: Promise.resolve([1]),
            approveCampaign: Promise.resolve([1])
        });
        campaignRouter = new CampaignRouter(campaignService);
        campaignRouter.router();
        req = jasmine.createSpyObj('req', ['params', 'query', 'body']);
        res = jasmine.createSpyObj('res', ['json']);
    });

    it(" should run router method successfully", () => {
        campaignRouter.router();
    });

    it(" should support get /", (done) => {
        campaignRouter.get(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith(resultCampaign);
            expect(200, "ok")
            done();
        })
    });

    it(" should support get /search", (done) => {
        campaignRouter.searchCampaigns(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith(resultCampaign);
            expect(200, "ok")
            done();
        })
    })

    // it(" should support get /watchlist", (done) => {
    //     campaignRouter.getWatchlistedCampaigns(req, res).then(() => {
    //         expect(res.json).toEqual([]);
    //         expect(200, "ok")
    //         done();
    //     })
    // })



});