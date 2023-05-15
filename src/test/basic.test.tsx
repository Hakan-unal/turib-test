import { test, assertType, expectTypeOf, assert, describe, it, expect } from "vitest";
import { showNotification } from "../components/general/notification"
import Page404 from '../pages/404/404';
import App from '../App';

import { render, screen } from '@testing-library/react';



// test('my types work properly', () => {
//     expectTypeOf(showNotification).toBeFunction()

//     const param={

//     }
//     expectTypeOf(showNotification).parameter("type").toMatchTypeOf<{ type: string }>()

//     // @ts-expect-error name is a string
//     assertType(mount({ type: "42" }))
// })

// Only this suite (and others marked with only) are run


describe("App load test", () => {
    test("should show title all the time", () => {

        render(<App />)

        expect(screen.getByText(/bulunamadı/i)).toBeDefined()
    })
})