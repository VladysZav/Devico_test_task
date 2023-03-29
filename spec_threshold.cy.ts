import {IDS} from '../../src/ui/ids';

describe('Threshold plugin', () => {

	Cypress.on('uncaught:exception', (err) => {
		console.log('Cypress detected uncaught exception: ', err);
		return false;
	});

	beforeEach(() => {
		cy.visit(`${Cypress.env('MSTR_BASE_URL')}?evt=2048001&src=mstrWeb.2048001&documentID=0694C9D54A54CEE6068DEDA6067B12EA&currentViewMedia=1&visMode=0&Server=30.20.30.21&Project=MSTR%2B%2B&Port=0&share=1`);
		// sign in to Mstr
		cy.get('input[name=Uid]').type(Cypress.env('MSTR_TEST_USER'));
		if(Cypress.env('MSTR_TEST_PASSWORD'))
			cy.get('input[name=Pwd]').type(Cypress.env('MSTR_TEST_PASSWORD'));
		cy.get('#loginForm').submit();
		// open design mode
		cy.get('.mstrHamburger').click();
		cy.get('a[cmdid="designViewMode"]').click();
		// sign in to Mstr++
		// cy.setExtensionStorage('local', {User: null});
		// cy.get('.mstrpp-dock .icon').click();
		// cy.get(`.mstrpp[data-id="${IDS.ACCOUNT_PAGE}"] div[data-id="${IDS.SIGNIN_NOTE}"] a`).click();
		// cy.get(`.mstrpp[data-id="${IDS.ACCOUNT_PAGE}"] input[name=Name]`).type(Cypress.env('MSTRPP_TEST_USER'));
		// cy.get(`.mstrpp[data-id="${IDS.ACCOUNT_PAGE}"] input[name=Password]`).type(Cypress.env('MSTRPP_TEST_PASSWORD'));

		// cy.get(`.mstrpp[data-id="${IDS.ACCOUNT_PAGE}"] div[data-id="${IDS.SIGNIN_BUTTON}"]`).click();
		// cy.get(`.mstrpp[data-id="${IDS.APPLICATION_PAGE}"] .x`).click();
		cy.get(`div[node_id="K8"]`).click();
		cy.get(`div[node_id="K8"]`).click();
		cy.get(`div[node_id="K33"]`).click();
		cy.get(`div[node_id="K34"]`).click();
	});

	// beforeEach(() => {
	// 	Cypress.Cookies.preserveOnce('JSESSIONID', 'bset', 'MSTR_AUTH');
	// });

	after(() => {
		cy.window().scrollTo('right');
		cy.get('.mstrAccountMenu').click({force: true});
		cy.get('.logout').click({force: true});
	});

	it('Copy single condition across grids', () => {
		//copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_1 > table > tbody > tr > td:nth-child(1)').click({force: true});
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click({force: true});
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click({force: true});
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click({force: true});
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		//cy.get('#\\32 62144015').click();
		cy.get('span[cmdid="atePaste"]').click({force: true});
		// verify
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click({force: true});
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click({force: true});
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstr-filter-text-editable').click({force: true});
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('10~1'));
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform input[name="constantValue"]').then($cv => expect($cv.val()).to.be.equal('100'));
		cy.get('#262144015').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#tbFormat').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		// The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(255, 0, 0)', fontFamily: 'Arial', fontWeight: '1', fontSize: '18', underline: true, replaceOption: '3', replaceText: '', fillColor: 'rgb(255, 255, 0)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 255)'});
		cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
	});

	it('Copy single condition accross grids (compare to metric)', () => {
		//copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_3 > table > tbody > tr > td:nth-child(1)').click();
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click({force: true});
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});

		// verify
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstr-filter-text-editable').click();
		//cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('10~1'));
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name="secondMetricIDTypeNameCombo"]').then($cv => expect($cv.val()).to.be.equal('AF65C67440F7ACD3CD6EF6B89E0539E3~4~Discount'));
		cy.get('#acceptButton').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#tbFormat').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		// The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(0, 51, 0)', fontFamily: 'Arial Narrow', fontWeight: '1', fontSize: '10', underline: false, replaceOption: '3', replaceText: '', fillColor: 'rgb(255, 255, 255)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 0)'});
		cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
	});

	it('Copy single conditions across grids (replace data)', () => {
		//copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_5 > table > tbody > tr > td:nth-child(1)').click({force: true});
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click({force: true});
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});
		// verify
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstr-filter-text-editable').click();
		//cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('9~1'));
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform input[name="constantValue"]').then($cv => expect($cv.val()).to.be.equal('10'));
		//cy.get('#262144015').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#tbFormat').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		//The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(0, 0, 0)', fontFamily: 'Arial', fontWeight: '0', fontSize: '10', underline: false, replaceOption: '3', replaceText: '--', fillColor: 'rgb(255, 255, 255)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 0)'});
		// cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
		// cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
	});

	it('Copy lowest condition', () => {
		//copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_6 > table > tbody > tr > td:nth-child(1)').click();
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(8000);
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});

		// verify
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstr-filter-text-editable').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('2~2'));
		//cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform input[name="constantValue"]').then($cv => expect($cv.val()).to.be.equal('20'));
		//cy.get('#262144015').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#tbFormat').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		// The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(255, 0, 0)', fontFamily: 'Arial', fontWeight: '0', fontSize: '10', underline: false, replaceOption: '3', replaceText: '', fillColor: 'rgb(255, 255, 153)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 0)'});
		// cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
		// cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
	});

    	it('Copy highest condition', () => {
		//copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_7 > table > tbody > tr > td:nth-child(1)').click();
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(8000);
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});

		// verify
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click({force: true});
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstr-filter-text-editable').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('1~2'));
		//cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform input[name="constantValue"]').then($cv => expect($cv.val()).to.be.equal('10'));
		//cy.get('#262144015').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#tbFormat').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		// The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(0, 128, 0)', fontFamily: 'Wingdings', fontWeight: '0', fontSize: '10', underline: false, replaceOption: '3', replaceText: '', fillColor: 'rgb(255, 255, 255)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 0)'});
		cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
	});

	it('Copy compound conditions across grids', () => {
		// copy
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_2 > table > tbody > tr > td:nth-child(1)').click();
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('#edtAdvancedThresholds_AdvancedThresholdsRWEditorStyle > div.mstrDialogBone > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td #ok').click({force: true});

		// paste
		cy.get('.mstrWaitBox').should('be.hidden');
		const targetImmutableK = 'W396431833D914760AA282A7E399DD856';
		cy.get(`div[node_id="${targetImmutableK}"]`).click();
		cy.get('#ribbonToolbarTabsListContainer > div:nth-child(4) > table > tbody > tr > td.right').click();
		cy.get('#RwDataMenu_ > tbody > tr > td > div > div:nth-child(27) > a').click();
		cy.get('#RwDataThresholdsMenu_ > tbody > tr > td > div > div:nth-child(2) > a > div.mstrMenuOption_d2 > span:nth-child(1)').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('span[cmdid="atePaste"]').click();
		// verify
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstrFilterEditor .mstrFilterEditor tr:nth-child(1) .mstr-filter-text-editable').click();
		// first condition
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform select[name=functionAndFunctionTypeCombo]').then($select => expect($select.val()).to.be.equal('10~1'));
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform input[name="constantValue"]').then($cv => expect($cv.val()).to.be.equal('2'));
		cy.get('#acceptButton').click();
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform .mstrFilterEditor .mstrFilterEditor tr:nth-child(3) .mstr-filter-text-editable').click();
		// second condition
		cy.get('#elementKeys > option').then($keys => {
		       	expect($keys.val()).to.be.equal('B017A8AD4AEA621F23B9CC8ACBAAB7DE:10~1048576~Ikura:12 - 200 ml jars');
		});
		cy.get('#acceptButton').click();
                cy.get('.mstrWaitBox').should('be.hidden');

		cy.wait(4000);
		cy.get('#tbFormat').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		// The verification step shouldn't be removed. It's necessary for checking the formatting
		//verifyThreshold({fontColor: 'rgb(0, 0, 255)', fontFamily: 'Batang', fontWeight: '0', fontSize: '10', underline: false, replaceOption: '3', replaceText: '', fillColor: 'rgb(255, 255, 255)', border: '#border2', borderStyle: '1', borderColor: 'rgb(0, 0, 0)'});
		// cy.get('div[scriptclass="mstrThresholdFormatEditorImpl"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
		// cy.get('div[scriptclass="mstrAdvancedThresholdEditor"] #ok').click({force: true});
		// cy.get('.mstrWaitBox').should('be.hidden');
	});

	it.only('Copy & paste for current metric', () => {
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.contains('.mstrListBlockToolbarItemName', "Data").next().click();
		cy.contains('.mstrSubMenuOption_d2','Thresholds').click();
		cy.contains('.mstrMenuOption_d2','Advanced').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('[class="ateContainer"] > div').then(
			$div => {
				expect($div).to.have.length(8);
			}
		)
		cy.get('#ate_7_1').click({force: true});
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('span[cmdid="atePaste"]').click({force: true});
		cy.wait(10000);
		cy.get('[class="ateContainer"] > div').then(
			$div => {
				expect($div).to.have.length(9);
			}
		)
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').find('[id*="deleteButton"]').click({force: true});
	});
	
	it.only('Copy thresholds with selection list (Beverages, Condiments) between grids', () => {
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.contains('.mstrListBlockToolbarItemName', "Data").next().click();
		cy.contains('.mstrSubMenuOption_d2','Thresholds').click();
		cy.contains('.mstrMenuOption_d2','Advanced').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_8').click({force: true});
		cy.wait(6000);
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('div[id="tbMetrics"]').click({force: true});
		cy.wait(4000);
		cy.get('#pkr8').click({force:true});
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});
		cy.wait(10000);
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('#tbDelete').click({force: true});
		
	});

	it.only('Copy between grids and remove pasted threshold', () => {
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.contains('.mstrListBlockToolbarItemName', "Data").next().click();
		cy.contains('.mstrSubMenuOption_d2','Thresholds').click();
		cy.contains('.mstrMenuOption_d2','Advanced').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('#ate_7_1').click({force: true});
		cy.wait(6000);
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('div[id="tbMetrics"]').click({force: true});
		cy.wait(4000);
		cy.get('#pkr8').click({force:true});
		cy.wait(4000);
		cy.get('span[cmdid="atePaste"]').click({force: true});
		cy.wait(10000);
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('#tbDelete').click({force: true});
	});

	// Needs some rework. All other metrics is the Paste located next to 'span[cmdid="atePaste"]'.
	// The past functionality walks through all metrics and pastes the thresholds there.
	// After pasting we need to verify, the threshold is actually pasted. This verification step is missing.
	it.only('Apply to all other metrics in a grid', () => {
		const sourceImmutableK = 'WC39AA68124B047D18B8C66ED17383288';
		cy.get(`div[node_id="${sourceImmutableK}"]`).click();
		cy.contains('.mstrListBlockToolbarItemName', "Data").next().click();
		cy.contains('.mstrSubMenuOption_d2','Thresholds').click();
		cy.contains('.mstrMenuOption_d2','Advanced').click({force: true});
		cy.get('.mstrWaitBox').should('be.hidden');
		cy.wait(4000);
		cy.get('[class="ateContainer"] > div').then(
			$div => {
				expect($div).to.have.length(8);
			}
		)
		cy.get('#ate_7_1').click({force: true});
		cy.get('span[cmdid="ateCopy"]').click({force: true});
		cy.get('span[cmdid="atePaste"]').click({force: true});
		cy.wait(10000);
		cy.get('[class="ateContainer"] > div').then(
			$div => {
				expect($div).to.have.length(9);
			}
		)
		cy.get(`div[data-state="finished"]`, {timeout: 200000}).should('have.data', 'id', IDS.THRESHOLDS_TASK_LIST);
		cy.get(`div[data-id="${IDS.THRESHOLDS_TASK_LIST}"] .x`).click();
		cy.get('.mstrppSelected div[scriptclass="mstrThresholdExpressionEditor"].mstrTransform').find('[id*="deleteButton"]').click({force: true});
		cy.get('#apply').click({force: true});
	});
	
	

	

	const verifyThreshold = exp => {		    
		cy.get('#tbThFnIdColor > span').then($fontColor => expect($fontColor).to.have.css('background-color', exp.fontColor));
		cy.get('#tbThFnIdName').then($fontFamily => expect($fontFamily).to.have.value(exp.fontFamily));
		cy.get('#tbThFnIdBoldItalic').then($fontWeight => expect($fontWeight).to.have.value(exp.fontWeight));
		cy.get('#tbThFnIdSize').then($fontSize => expect($fontSize).to.have.value(exp.fontSize));
		cy.get('#tbThFnIdUnderline').should(exp.underline ? 'be.checked' : 'not.be.checked');
		cy.get('#tbThFnIdStrikeout').should(exp.strikeout ? 'be.checked' : 'not.be.checked');
		cy.get('#thReplace').should(exp.replaceText ? 'be.checked' : 'not.be.checked');
		cy.get('#thReplaceOption').should('have.value', exp.replaceOption);
		cy.get('#thReplaceText').should('have.value', exp.replaceText);
		cy.get('#tbThCLIdFillColor > span').then($fillColor => expect($fillColor).to.have.css('background-color', exp.fillColor));
		cy.get(exp.border).should('be.checked');
		cy.get('#tbThCLIdAllStyle').should('have.value', exp.borderStyle);
		cy.get('#tbThCLIdAllColor > span').then($borderColor => expect($borderColor).to.have.css('background-color', exp.borderColor));
	};
// function before(arg0: () => void) {
// 	throw new Error('Function not implemented.');
// }

// function beforeEach(arg0: () => void) {
// 	throw new Error('Function not implemented.');
// }

// function after(arg0: () => void) {
// 	throw new Error('Function not implemented.');
// }

// function expect(arg0: any) {
// 	throw new Error('Function not implemented.');
// }
});
