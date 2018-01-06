import readFile from '../../../gulp/helpers/readFile';

test('inside-height', ()=>{
	return readFile(__dirname+'/insideHeight.css').then(css => {
		expect( css ).toBe('@media (max-height: 800px) and (min-height: 601px){.unitTest{color:#000}}\n');
	})
})
