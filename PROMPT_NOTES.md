# Prompt Notes

The prompts given to Claude during this project, in order, verbatim.

1. "Confirm that you can read the stock file"

2. "Write me plan for a phone-first landing page for Nike's customers to buy the new Pegasus 43 running shoe. Place the content in this order: Photos, Price, Sizes, Tech Copy, Reviews. Use the stock list information in nike_pegasus_size_stock.json for the content. Ensure there's to layout-shifts, including holding space for photos and fonts when loading. Give me the plan in headed sections, with each part's order and size at 375 pixels wide."

3. "Thinking through the runner's journey from first look to buying is a smart way to order Photos, Price, Sizes, Tech Copy and Reviews. How did you make sure that order works on a 375 pixel wide phone screen in your page plan?"

4. "give me a short 2 sentence answer"

5. "Following the plan made up in 'Nike Pegasus 43 — Mobile Landing Page Plan', build me the Nike shoe landing page using Next.js and styling with Tailwind CSS with a mobile first approach, and seed it with the information provided in the nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json file. For shoe sizes low in stock, give the user a notice if they select a size thats running out by providing a simple message underneath saying 'only x left in stock'. Name the color of the shoe as a sub title underneath the picture. The layout should hold space for the photos and size buttons, so when the media loads in the layout wont shift."

6. "explain to me the problem you're facing"

7. "I'll run it myself"

8. "It's stuck on my end too. How can I fix this?"

9. "I just restarted the mac, try again"

10. "Push and commit this to my Github along with the prompt notes. Create a readme that includes information on the project, the task/problem, the solution, how to run the project"

11. "use the github plugin"

12. "it's enabled now, go ahead"

## Notable detours

- The dev server hung indefinitely for an extended stretch (no crash, no "Ready" message). Root cause turned out to be a corrupted `node_modules` from repeated config churn while fixing an earlier Tailwind/Turbopack integration crash — fixed with a clean reinstall (`rm -rf node_modules .next package-lock.json && npm install`).
- A real bug was found during manual verification: the photo skeleton placeholder never faded out for cached images, because React's `onLoad` prop doesn't fire if the native image load event already happened before the listener attached. Fixed by checking `img.complete` in a ref callback.
