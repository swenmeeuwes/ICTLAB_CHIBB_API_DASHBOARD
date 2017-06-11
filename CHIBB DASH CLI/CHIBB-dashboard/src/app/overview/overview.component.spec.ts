import { AuthenticationService } from '../authentication/authentication.service';
import { OverviewComponent } from './overview.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Dashboard Component suite
// Tests logic depending on the authentication service
describe('Dashboard Component', () => {
    var fixture;
    var component;

    var authenticationService;

    var welcomeElement;
    var nativeWelcomeElement;

    var suggestionElement;
    var nativeSuggestionElement;

    beforeEach(() => {
        // Mock AuthenticationService for test purposes
        var mockAuthenticationService = {
            isAuthenticated: function (): boolean {
                return true;
            },
            getUsername: function (): string {
                return 'Some dude';
            }
        };  

        TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            providers: [{ provide: AuthenticationService, useValue: mockAuthenticationService }]
        });

        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;

        // AuthenticationService from the root injector
        authenticationService = TestBed.get(AuthenticationService);

        // Get the "welcome" element by CSS selector
        welcomeElement = fixture.debugElement.query(By.css('.welcome'));
        nativeWelcomeElement = welcomeElement.nativeElement;

        suggestionElement = fixture.debugElement.query(By.css('.suggestion'));
        nativeSuggestionElement = suggestionElement.nativeElement;
    });

    it('Should be polite and greet the user', () => {
        fixture.detectChanges();
        expect(nativeWelcomeElement.textContent).toContain('Some dude', 'Expected name');
        expect(nativeSuggestionElement.textContent).toContain('Continue', 'Expected suggestion');
    });

    it('Should welcome "Another dude"', () => {
        authenticationService.getUsername = function (): string {
            return 'Another dude';
        }

        fixture.detectChanges();
        const content = nativeWelcomeElement.textContent;
        expect(content).toContain('Another dude', 'Expected name');
    });

    it('Should welcome anonymous', () => {
        authenticationService.isAuthenticated = function (): boolean {
            return false;
        }

        fixture.detectChanges();
        expect(nativeWelcomeElement.textContent).not.toContain('Another dude', 'Expected name');
        expect(nativeSuggestionElement.textContent).toContain('login', 'Expected suggestion');
    });
});