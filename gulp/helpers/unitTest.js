import readFile from './readFile';

export default function unitTest (fileName, dir, expectedResult){
	test(fileName, ()=>{
		return readFile(`${dir}/${fileName}.css`).then(css => {
			expect( css ).toBe(expectedResult+'\n');
		})
	})
}

//__dirname