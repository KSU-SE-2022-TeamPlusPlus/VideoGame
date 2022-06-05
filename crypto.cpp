#include <iostream>
#include <string>
//Joel Maus
//basic crypto program to encypt by substitution with modulo 26
using namespace std;

int main() {
	char plain[200] = {};
	char cipherInput[200] = {};
	int key;
	int len;
	int cipher[20] = {};
	cout << "Welcome to Joel's Encryption Program.\n";
	cout << "Enter a key that you will keep so you can decrypt later(numbers only): ";
	cin >> key;
	key = key % 26;
	cout << "Input @ to stop encrypting\n\n";
	while (plain[0] != '@') {
		cout << "Enter text to encrypt: ";
		cin >> plain;
		len = strlen(plain);
		for (int x = 0; x < len; ++x) {
			cipher[x] = int(plain[x]) + key;
			cipher[x] = cipher[x] - 96;
			//converts ascii to char value for testing
			if (cipher[x] > 26) {
				cipher[x] = cipher[x] % 26;
			}
			//puts back into ascii
			cipher[x] = cipher[x] + 96;
			cout << char(cipher[x]);
		}
		cout << "\n";
	}
	cout << "\nInput ! to stop decrypting\n\n";
	while (cipherInput[0] != '!') {
		cout << "Enter ciphertext to decrypt: ";
		cin >> cipherInput;
		len = strlen(cipherInput);
		for (int x = 0; x < len; ++x) {
					
			cipher[x] = cipherInput[x] - key;
			//adds 26 if under the lowest ascii value
			if (cipher[x] < 97) cipher[x] += 26;
			cout << char(cipher[x]);			
		}
		cout << "\n";
	}
	cout << "\n";
	
	system("pause");
}